import type { MetaFunction, LoaderFunction } from "remix";
import { IoIosChatbubbles, IoIosHeart, IoIosShare } from "react-icons/io";

const comments = [
  {
    id: 1,
    name: "afafh ahf",
    comment: "asfahfu haosfah sf",
  },
  {
    id: 2,
    name: "afafh ahf",
    comment: "asfahfu haosfah sf",
  },
  {
    id: 3,
    name: "afafh ahf",
    comment: "asfahfu haosfah sf",
  },
  {
    id: 4,
    name: "afafh ahf",
    comment: "asfahfu haosfah sf",
  },
  {
    id: 5,
    name: "afafh ahf",
    comment: "asfahfu haosfah sf",
  },
];

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
      <section className="my-5  border-gray-300  md:w-[60%] md:border-r ">
        <div className="min-h-screen px-3 md:px-8">
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

          <div className="mt-3">
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur ab nobis consequatur soluta, sapiente, expedita quis
              rerum tenetur aspernatur impedit quia dolore odit natus? Amet,
              dolorem laborum. Hic, sed eos. Ratione incidunt nobis eveniet,
              dolore excepturi, laudantium hic optio consequatur blanditiis
              doloremque officia cum repellendus possimus veritatis, voluptate
              iste? Facilis odit modi doloribus velit quo blanditiis saepe porro
              necessitatibus repellendus. Aspernatur a dicta, ea sint quae
              cupiditate enim ut repellendus odio id quisquam! Consequuntur et
              repellat ratione vel aspernatur est necessitatibus perspiciatis!
              Dicta aspernatur nesciunt repellendus in nulla cumque tempore?
              Autem illum quidem nobis suscipit quis pariatur est aut dicta vero
              voluptate? Ullam dolorum aliquid, exercitationem molestiae est
              repellat perspiciatis quo error, fugit blanditiis at! Cum dolores
              quam alias illo. Ratione autem, ab quam nostrum magnam quas sunt,
              voluptatibus, explicabo aliquid deserunt nobis cumque possimus!
              Modi, odit quisquam! Perspiciatis perferendis eaque, harum illo
              distinctio vero saepe veritatis minus fugit officia? Dolore magni
              quia voluptate officia, repellat ad omnis nobis nesciunt
              temporibus consequatur sed eaque beatae est rem. Adipisci,
              recusandae atque sint nesciunt, doloribus magnam unde cum qui
              quisquam cupiditate commodi! Officiis, rem eius ab perferendis
              dolores quaerat dignissimos consectetur quisquam, quae ipsam
              asperiores exercitationem optio nesciunt corrupti expedita. Aut
              amet praesentium dolore fugiat est maxime voluptatum neque,
              accusantium vitae. Vitae. Ex reprehenderit inventore quaerat,
              quibusdam repudiandae quidem. Magnam necessitatibus atque iste,
              possimus debitis asperiores incidunt nobis nisi reprehenderit,
              ullam, vel sapiente dolor totam adipisci recusandae ut dignissimos
              quaerat voluptatum nesciunt! Ut, eum officiis sed, omnis optio
              corrupti impedit nisi quam consequuntur odit voluptate, commodi
              quos repudiandae tempora quis fuga doloremque eaque sint quas
              quaerat? Beatae, tenetur libero. Eligendi, harum dolorem? Possimus
              voluptas natus aliquam illo fuga, molestiae qui quisquam, quam
              modi veritatis laborum quas cupiditate corrupti suscipit eaque.
              Beatae qui commodi dolor sint necessitatibus fugiat, officia autem
              ut amet mollitia.
            </p>

            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Aspernatur sunt praesentium deleniti similique laudantium placeat
              molestiae ratione error porro libero? Blanditiis hic nemo
              voluptate ex tempore quos quas impedit vel.
            </p>

            <p className="mt-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
              ducimus assumenda, eius ipsam mollitia vitae error? Debitis nisi
              soluta sapiente libero recusandae at magnam, illum dignissimos?
              Explicabo, quod? Velit, sunt? A inventore quisquam quis debitis
              labore ipsam consequuntur deserunt perferendis dignissimos id sed
              sunt dolores hic animi asperiores quae laboriosam culpa, esse
              vitae similique beatae autem nulla dolore! Sequi, reprehenderit.
              Dolorem omnis aliquid sit tempore nesciunt culpa. Deserunt quae
              nihil vero quod suscipit itaque earum doloremque laboriosam illo
              nobis, necessitatibus odio. Vero magni saepe et quos, suscipit
              sunt soluta rem?
            </p>

            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dolor
              tempora vitae cumque minima fuga porro repellendus debitis
              doloribus magnam sapiente iusto, quasi consectetur explicabo
              reiciendis aut, ab, deleniti quia? Consequatur molestias nam
              eveniet consequuntur veritatis ducimus? Harum doloribus fuga
              eveniet repudiandae vitae. Repellat blanditiis consequatur, rerum
              expedita vero, aliquam facere, laboriosam illum officiis sint
              aperiam iusto maiores dolorum delectus! Quos molestias possimus
              laborum incidunt vitae aliquid placeat corporis ipsa cumque aut
              corrupti voluptate recusandae eveniet beatae ratione illum labore,
              temporibus molestiae totam. Veritatis optio quasi quos repellendus
              beatae porro. Eius quia quasi nam et. Aperiam delectus harum
              corporis molestiae error dolores totam. Assumenda perspiciatis rem
              rerum quidem dolore ratione saepe voluptates, excepturi est
              consectetur! Aspernatur dolore laborum odit ipsa? Repellendus
              expedita assumenda quasi eligendi necessitatibus accusantium!
              Commodi ut expedita, ab molestias, accusantium sunt deleniti
              maxime vitae nemo, debitis modi dolore impedit harum quasi quam
              nulla molestiae. Magnam, nemo itaque?
            </p>

            <p className="mt-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
              harum voluptatem repellendus culpa delectus ipsam ad sint.
              Deserunt debitis iusto quia laboriosam dicta, repudiandae ducimus
              aperiam porro deleniti maiores quod! Enim sint dicta quisquam
              suscipit delectus tempore, repellendus numquam eum dignissimos
              distinctio at in, odio corporis unde dolores reiciendis, assumenda
              eius libero voluptate est magni iure sit similique neque!
              Corrupti. In ipsam pariatur accusamus dignissimos tempore est,
              libero amet commodi sequi, officia consequatur repellendus animi
              deleniti molestias inventore totam eius. Veniam culpa eaque dolor
              incidunt sit ea hic dicta nesciunt. Expedita nulla earum eaque
              doloribus, possimus delectus laboriosam quidem saepe quia suscipit
              est provident illo officia laudantium soluta. Reprehenderit
              repellendus explicabo quas velit maiores harum cumque optio soluta
              nesciunt perferendis! Cupiditate beatae temporibus nesciunt
              consequatur expedita doloremque saepe, libero mollitia iusto illum
              modi harum perferendis cum vel maxime quibusdam sed tempora
              excepturi quas officiis ea deleniti dolorem eveniet! Illum, vitae!
              Explicabo voluptates tempora quos quo qui est dolorem tempore
              sunt. Dolores, quo sit! Totam officiis eligendi porro consequuntur
              blanditiis esse repellendus, corporis ad nemo consequatur unde
              repudiandae illo fugit reiciendis. Sed soluta quidem provident non
              quasi accusantium hic quisquam fugit facere? Optio aliquid
              incidunt, quisquam dolores animi cupiditate iure mollitia a, quod
              beatae ratione. Accusamus cum officia dolorem numquam
              exercitationem.
            </p>

            <h4 className="mt-3 font-bold">In Conclusion</h4>
            <p className="mt-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
              voluptatum harum accusamus doloribus qui ipsam quidem, illo
              molestias vel? Accusamus qui enim repellat optio laboriosam
              quaerat ipsa nobis earum consectetur. Commodi, earum expedita
              dolore dicta sed molestiae in. Fugiat iste voluptas, delectus vero
              atque necessitatibus quisquam neque ea aut sed numquam quis
              asperiores omnis aliquid debitis! Voluptate, illum quia! Modi.
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 mt-11 flex h-14 items-center border-b border-t border-gray-300 bg-slate-50 px-6 text-gray-600 md:px-11">
          <div className="mr-5 flex">
            <IoIosHeart size={23} />
            <p className="ml-2">200</p>
          </div>

          <div className="flex">
            <IoIosChatbubbles size={23} />
            <p className="ml-2">30</p>
          </div>

          <IoIosShare size={23} className="ml-auto" />
        </div>

        <div className="min-h-screen px-3 py-4 md:px-8">
          <p className="font-bold">Comments (30)</p>

          <div className="mt-6">
            {comments.map((comment) => (
              <div key={comment.id} className="my-3">
                <div className="flex">
                  <img src="" className="mr-3 h-11 w-11 rounded-full" alt="" />
                  <div>
                    <p className="font-bold">Smith Emma</p>
                    <p>timestamp</p>
                  </div>
                </div>
                <p className="ml-4">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Exercitationem, totam hic animi omnis deserunt delectus sed
                  enim laudantium natus, voluptas explicabo? Quasi excepturi
                  ipsa distinctio natus quo qui tempore saepe.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="my-5 px-3 md:w-[40%] md:px-8">
        <p>asfasf</p>
      </section>
    </div>
  );
}

export default Blog;
