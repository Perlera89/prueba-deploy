"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Camera, LogOut, Mail, User } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalTab from "@/components/page/profile/tabs/personal";
import SecurityTab from "@/components/page/profile/tabs/security";
import { useAuthStore } from "@/store/auth";
import {
  useDeleteImage,
  useDeleteImageStudent,
  useFindProfile,
  useFindStudent,
  useUpdateImage,
  useUpdateStudentImage,
} from "@/hooks/use-profile";
import { InstructorProfile } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Upload, Trash2 } from "lucide-react";
import { useUploadThumbnail, useDeleteThumbnail } from "@/hooks/use-thumbnail";
import { useBreadcrumbStore } from "@/store/breadcrumb";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const { setItems } = useBreadcrumbStore();

  const isStudent = user?.role === "student";
  const isTeacher = user?.role === "teacher";


  useEffect(() => {
    setItems([
      { label: "Inicio", href: "/home" },
      { label: "Perfil", href: "/profile" },
    ]);

    return () => {
      useBreadcrumbStore.getState().resetItems();
    };
  }, []);

  const { data: profile } = isTeacher
    ? useFindProfile(user?.id as string)
    : useFindStudent(user?.profileId as string, isStudent);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateInstructorImageMutation = useUpdateImage();
  const deleteInstructorImageMutation = useDeleteImage();
  const updateStudentImageMutation = useUpdateStudentImage();
  const deleteStudentImageMutation = useDeleteImageStudent();

  const handleDeleteImage = async () => {
    if (profile?.imagePerfil) {
      try {
        await useDeleteThumbnail(profile.imagePerfil);
        if (isStudent) {
          await deleteStudentImageMutation.mutateAsync({
            profileId: user?.profileId as string,
          }).then(() => useAuthStore.setState({ user: { ...user, profileImage: '' } }));
        } else {
          await deleteInstructorImageMutation.mutateAsync({
            profileId: user?.profileId as string,
          }).then(() => useAuthStore.setState({ user: { ...user, profileImage: '' } }));
        }
      } catch (error) {
        console.error("Error deleting image profile:", error);
      }
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    const imageUrl: string = await useUploadThumbnail(file);
    if (imageUrl) {
      if (isStudent) {
        await updateStudentImageMutation.mutateAsync({
          studentProfileId: profile?.id as string,
          imagePerfil: imageUrl,
        }).then(() => {
          useAuthStore.setState({ user: { ...user, profileImage: imageUrl } });
        });
      } else {
        await updateInstructorImageMutation.mutateAsync({
          profileId: profile?.id as string,
          imagePerfil: imageUrl,
        }).then(() => {
          useAuthStore.setState({ user: { ...user, profileImage: imageUrl } });
        });;
      }
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleLogout = () => {
    logout();
  };


  return (
    <>
      <div className="w-full px-6">
        <h2 className="text-2xl font-semibold">Mi Perfil</h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24 ">
                      <AvatarImage
                        className="cover object-cover rounded-full"
                        src={profile?.imagePerfil || "./avatar-fallback.png"}
                        alt={profile?.surnames}
                      />
                    </Avatar>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    {user?.role !== 'manager' &&
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                            title="Opciones de foto de perfil"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={triggerFileSelect}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            <span>Cambiar foto</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer text-destructive"
                            onClick={handleDeleteImage}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            <span>Eliminar foto</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    }
                  </div>
                  <h2 className="text-xl font-bold">{`${profile?.names} ${profile?.surnames}`}</h2>
                  <div className="w-full space-y-4 mt-2">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile?.user.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile?.user.role}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="w-full">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive"
                      asChild
                      onClick={handleLogout}
                    >
                      <Link href="#">
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs
              defaultValue={user?.role === "teacher" ? "personal" : "security"}
              className="w-full"
            >
              <TabsList className="mb-6">
                {user?.role === "teacher" && (
                  <TabsTrigger value="personal">
                    Información Personal
                  </TabsTrigger>
                )}
                {/*<TabsTrigger value="courses">Mis Cursos</TabsTrigger>
                <TabsTrigger value="notifications">Notificaciones</TabsTrigger>*/}
                <TabsTrigger value="security">Seguridad</TabsTrigger>
              </TabsList>

              {user?.role === "teacher" && (
                <TabsContent value="personal">
                  <PersonalTab profile={profile as InstructorProfile} />
                </TabsContent>
              )}

              {/*<TabsContent value="courses">
                <CoursesTab />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationsTab />
              </TabsContent>*/}

              <TabsContent value="security">
                <SecurityTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
