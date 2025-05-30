
import { UserX, Search } from "lucide-react";

interface EmptyMembersProps {
    isSearching?: boolean;
}

export function EmptyMembers({
    isSearching = false,
}: EmptyMembersProps) {
    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-12 px-4 border border-dashed rounded-lg bg-muted/10">
            <div className="flex flex-col items-center text-center max-w-md">
                {isSearching ? (
                    <>
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                            <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No se encontraron estudiantes</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            No se encontraron estudiantes que coincidan con
                            Intenta con otro término de búsqueda.
                        </p>
                    </>
                ) : (
                    <>
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                            <UserX className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No hay estudiantes inscritos</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Este curso aún no tiene estudiantes inscritos.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}