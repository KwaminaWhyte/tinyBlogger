import type { MetaFunction, LoaderFunction } from "remix";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: "Vladimir Putin Has Already Won, but Nobody Wants to Admit It",
    description: ` Aspernatur earum itaque error mollitia dolorum quidem odit
                    optio vel? Quasi error esse nobis quas dolor dolore pariatur
                    obcaecati aut debitis quam?`,
  };
};

function Blog() {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <section className="my-5 border-gray-300 px-3 md:w-[60%] md:border-r md:px-8">
        <div className="flex items-center py-5">
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            className="mr-3 h-9 w-9 rounded-full"
            alt=""
          />
          <div>
            <p className="font-bold">Ellen Smith</p>
            <p>Date . 12 min read</p>
          </div>
        </div>

        <h1 className="text-4xl font-bold">
          Introduction : From Lone Wolf to Wifehood
        </h1>
      </section>

      <section className="my-5 px-3 md:w-[40%] md:px-8">
        <p>asfasf</p>
      </section>
    </div>
  );
}

export default Blog;
