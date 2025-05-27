import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Container from "../ui/container";

type FeatureItem = {
  id: number;
  title: string;
  description: string;
};

export default function FeatSection() {
  const features: FeatureItem[] = [
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
      <Container className="py-16">
        <h3 className="text-5xl font-bold text-center md:text-start">
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
      </Container>
    </section>
  );
}
