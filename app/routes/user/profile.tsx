import React from "react";
import { type LoaderArgs, redirect } from "@remix-run/node";
import { getSession } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("auth_session")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/auth");
  }
  return { user: session.get("auth_user") };
}

function profile() {
  return (
    <div className="mx-auto h-full w-[60%]  border-r border-l  border-gray-700 p-6">
      <section className="h-full">
        <h1 className="mb-5 text-5xl">Profile </h1>
      </section>

      <section>
        <img
          className="h-48 w-48 rounded-full border border-gray-400 p-1"
          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          alt="profile_image"
        />{" "}
      </section>

      <section>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere totam
          debitis eum. Maxime id modi labore ex vel, maiores suscipit odio enim
          ad officiis dolorum, voluptatibus corrupti nulla, hic eius!
        </p>

        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim officiis
          nesciunt laboriosam, qui consequatur assumenda, cum veniam voluptate
          voluptatem ut, ducimus est illum! Velit magnam facilis voluptatem
          rerum vel molestias! Qui, quo totam laboriosam cumque asperiores
          mollitia suscipit, facere itaque voluptas, nostrum magnam molestiae?
          Velit tempora excepturi sapiente veritatis laboriosam tempore quae
          sunt corporis porro. Aspernatur id nobis ad quaerat. Sint eaque eum
          explicabo itaque repellat hic labore ratione mollitia, quae quod
          facere earum perferendis repudiandae aliquid beatae? Temporibus
          reiciendis vero fugiat dolores, inventore deleniti fuga architecto
          nostrum facere provident. Quas, doloremque neque praesentium sequi id
          temporibus architecto a reprehenderit sapiente commodi sint odio quia
          dolores quae culpa quis. Maxime quam corporis ea adipisci a sequi quae
          doloremque quod fuga? Obcaecati ex repudiandae eum voluptatum corporis
          accusantium similique, voluptate ratione officia cum sed facilis ea
          enim autem corrupti, libero ad perferendis saepe, aperiam sapiente
          omnis accusamus! Soluta, similique! Adipisci, maiores. Perferendis
          repellendus quasi quidem temporibus accusamus a mollitia odio optio
          totam deleniti repellat quis magnam officiis itaque corporis id facere
          assumenda autem repudiandae maiores veritatis, quae amet. Ratione, ad
          aperiam. Eum rem amet veniam doloremque tenetur incidunt reprehenderit
          aperiam nam, aliquid adipisci cum nihil, earum accusantium porro magni
          enim sit repellat cupiditate corporis consequuntur vitae quod vel
          dolores eligendi! Deleniti! Nesciunt nihil in repellat doloribus sit
          ex ut, odit veritatis numquam, pariatur, ratione labore? Alias nihil
          illo placeat minima quod ea consequuntur consectetur id, temporibus
          ut, totam quam quasi? Nesciunt? Sed quos voluptate explicabo provident
          rerum et quam reprehenderit laboriosam vel at esse, dignissimos
          facilis nihil, nesciunt illum. Repudiandae odit ipsa tenetur expedita
          obcaecati, numquam magnam eius quas similique debitis. Itaque
          accusantium ullam provident corporis, autem amet mollitia saepe
          pariatur ducimus nisi culpa recusandae, facilis quo dolore ut
          consectetur ipsum error! Repudiandae eum mollitia fuga officia
          recusandae ut optio minima?
        </p>
      </section>
    </div>
  );
}

export default profile;
