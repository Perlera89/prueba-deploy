import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // Obtener tipo de archivo o recurso del formData si se proporciona
    const resourceType = (formData.get("resourceType") as string) || "auto";

    if (!file) {
      console.error("No file provided in request");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Missing Cloudinary credentials");
      return NextResponse.json(
        { error: "Cloudinary configuration is missing" },
        { status: 500 }
      );
    }


    const cloudinaryFormData = new FormData();

    const timestamp = Math.round(new Date().getTime() / 1000).toString();
    const folder = "resources";

    const params = {
      timestamp: timestamp,
      folder: folder,
    };

    const paramEntries = Object.entries(params).sort(([a], [b]) =>
      a.localeCompare(b)
    );
    let signatureString = "";

    for (const [key, value] of paramEntries) {
      signatureString += `${key}=${value}&`;
    }

    signatureString = signatureString.slice(0, -1);

    const signature = crypto
      .createHash("sha1")
      .update(signatureString + apiSecret)
      .digest("hex");

    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("api_key", apiKey);
    cloudinaryFormData.append("timestamp", timestamp);
    cloudinaryFormData.append("signature", signature);
    cloudinaryFormData.append("folder", folder);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const cloudinaryResponse = await fetch(cloudinaryUrl, {
      method: "POST",
      body: cloudinaryFormData,
    });


    if (!cloudinaryResponse.ok) {
      const errorText = await cloudinaryResponse.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { raw: errorText };
      }

      console.error("Cloudinary API error:", {
        status: cloudinaryResponse.status,
        statusText: cloudinaryResponse.statusText,
        data: errorData,
      });

      return NextResponse.json(
        {
          error: "Failed to upload to Cloudinary",
          details: errorData,
          status: cloudinaryResponse.status,
        },
        { status: 500 }
      );
    }

    const result = await cloudinaryResponse.json();

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      resourceType: result.resource_type,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    });
  } catch (error) {
    console.error("Error in upload route handler:", error);
    return NextResponse.json(
      {
        error: "Failed to upload file",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get("publicId");

    if (!publicId) {
      console.error("No publicId provided in request");
      return NextResponse.json(
        { error: "No publicId provided" },
        { status: 400 }
      );
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Missing Cloudinary credentials");
      return NextResponse.json(
        { error: "Cloudinary configuration is missing" },
        { status: 500 }
      );
    }

    const timestamp = Math.round(new Date().getTime() / 1000).toString();

    const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(signatureString)
      .digest("hex");

    const params = new URLSearchParams();
    params.append("public_id", publicId);
    params.append("timestamp", timestamp);
    params.append("api_key", apiKey);
    params.append("signature", signature);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    const cloudinaryResponse = await fetch(cloudinaryUrl, {
      method: "POST",
      body: params,
    });

    if (!cloudinaryResponse.ok) {
      const errorText = await cloudinaryResponse.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { raw: errorText };
      }

      console.error("Cloudinary API error:", {
        status: cloudinaryResponse.status,
        statusText: cloudinaryResponse.statusText,
        data: errorData,
      });

      return NextResponse.json(
        {
          error: "Failed to delete from Cloudinary",
          details: errorData,
          status: cloudinaryResponse.status,
        },
        { status: 500 }
      );
    }

    const result = await cloudinaryResponse.json();

    return NextResponse.json({
      success: true,
      result: result,
    });
  } catch (error) {
    console.error("Error in delete route handler:", error);
    return NextResponse.json(
      {
        error: "Failed to delete file",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
