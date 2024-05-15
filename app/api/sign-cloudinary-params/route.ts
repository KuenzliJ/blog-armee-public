import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET || "", // Ensure a default value if undefined
});

// Define an asynchronous function to handle POST HTTP requests
export async function POST(request: Request) {
  // Parse the JSON payload from the incoming request
  const body = await request.json();
  // Extract parameters to be signed from the body of the request
  const { paramsToSign } = body;

  // Use Cloudinary's utility to sign the parameters with the API secret
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET || ""
  );

  // Return a JSON response containing the generated signature
  return Response.json({ signature });
}
