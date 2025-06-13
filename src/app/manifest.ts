import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anoto App",
    short_name: "Anoto",
    description: "Anoto App",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicons/icon-144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/favicons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/screenshot-1.png",
        sizes: "1920x1057",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screenshots/screenshot-2.png",
        sizes: "1920x1057",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screenshots/screenshot-3.png",
        sizes: "496x975",
        type: "image/png",
        form_factor: "narrow",
      },
      {
        src: "/screenshots/screenshot-4.png",
        sizes: "496x975",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
