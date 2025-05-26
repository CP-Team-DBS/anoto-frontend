import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

type FeatureItem = {
  title: string;
  description: string;
};

export default function FeatSection() {
  const features = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in erat at urna cursus vestibulum.",
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in erat at urna cursus vestibulum.",
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in erat at urna cursus vestibulum.",
    },
    {
      id: 4,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in erat at urna cursus vestibulum.",
    },
  ];

  return (
    <section className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h3 className="text-5xl font-bold">
          Fitur Utama <span className="text-secondary">Anoto</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {features.map((feature) => (
            <Card key={feature.id}>
              <CardHeader>
                <CardTitle className="font-bold text-2xl">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="bg-accent">Coba</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
