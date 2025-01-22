import ButtonLogin from "./components/ButtonLogin";
import ListItems from "./components/ListItems";
import FAQListItems from "./components/FAQListItems";
import Image from "next/image";
import productDemo from "./productDemo.jpeg";
import { auth } from "@/auth";

export default async function Home() {
  const isLoggedIn = true;
  const name = "Mardix";

  const session = await auth();
  console.log(session);

  let greeting2 = `Hello ${isLoggedIn ? name : "Guest"}`;
  console.log(greeting2);

  const pricingFeaturesList = [
    "Collect customer feedback",
    "Unlimited boards",
    "Admin dashboard",
    "24/7 support",
  ];

  return (
    <main>
      {/* HEADER */}
      <section className="bg-base-200">
        <div className="max-w-5xl mx-auto bg-base-200 flex justify-between items-center px-8 py-2">
          <div className="font-bold">CodeFastSaaS</div>
          <div className="space-x-4 max-md:hidden">
            <a className="link link-hover" href="#pricing">
              Pricing
            </a>
            <a className="link link-hover" href="#faq">
              FAQ
            </a>
          </div>
          <div className="bg-green-400">
            <ButtonLogin isLoggedIn={isLoggedIn} name={name} />
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="px-8 text-center lg:text-left py-32 max-w-5xl mx-auto flex flex-col lg:flex-row gap-14 items-center lg:items-start">
        <Image
          src={productDemo}
          alt="Product Demo"
          className="w-96 rounded-xl"
        />

        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
            Collect customer feedback to build better products.
          </h1>
          <div className="opacity-90 mb-10">
            Create a feedback board in minutes, prioritize features, and build
            products your customers will love.
          </div>

          <ButtonLogin isLoggedIn={isLoggedIn} name={name} />
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-base-200" id="pricing">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            A pricing that adapts to your needs.
          </h2>

          <div className="p-8 bg-base-100 max-w-96 mx-auto rounded-3xl space-y-6">
            <div className="flex gap-2 items-baseline">
              <div className="text-4xl font-black">$19</div>
              <div className="text-sm uppercase font-medium opacity-60">
                /month
              </div>
            </div>
            <ul className="space-y-2">
              {pricingFeaturesList.map((feature) => (
                <ListItems key={feature}>{feature}</ListItems>
              ))}
            </ul>
            <ButtonLogin
              isLoggedIn={isLoggedIn}
              name={name}
              extraStyle="w-full"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-base-200" id="faq">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            FAQ
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <ul className="max-w-lg mx-auto">
            {[
              {
                question: "What do I get exactly?",
                answer: "Loreum Ipseum",
              },
              {
                question: "Can I get a refund?",
                answer: "Loreum Ipseum",
              },
              {
                question: "I have another question?",
                answer: "Loreum Ipseum",
              },
            ].map((qa) => (
              <FAQListItems key={qa.question} qa={qa} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
