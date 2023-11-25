import {
  type SessionStorage,
  createCookieSessionStorage,
  redirect,
} from "@remix-run/node";
import Mine from "../models/Mine";
import UserController from "./UserController";

export default class MineController {
  private request: Request;
  private storage: SessionStorage;
  private adminController: any;

  constructor(request: Request) {
    this.request = request;

    const secret = process.env.SESSION_SECRET;
    if (!secret) {
      throw new Error("No session secret provided");
    }
    this.storage = createCookieSessionStorage({
      cookie: {
        name: "__session",
        secrets: [secret],
        sameSite: "lax",
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      },
    });

    return (async (): Promise<MineController> => {
      // await this.initializeModels();
      // this.adminController = await new AdminController(request);

      return this;
    })() as unknown as MineController;
  }

  public startMinning = async ({ userId }: { userId: string }) => {
    // let existMine = await Mine.findOne({
    //   user: userId,
    //   createdAt: "today",
    // });
    let mine = await Mine.create({
      user: userId,
    });

    return redirect("/");
  };

  public getMinner = async () => {
    const userController = await new UserController(this.request);
    const userId = await userController.getUserId();

    let mine = Mine.findOne({ user: userId });

    return mine;
  };

  public collectTreasure = async ({ mineId }: { mineId: string }) => {
    const userController = await new UserController(this.request);
    const user = await userController.getUser();

    await Mine.deleteOne({ _id: mineId, user: user?._id });

    await Treasure.create({
      user: user?._id,
      amount:
        user.level == "vip"
          ? 10
          : user?.level == "vvip"
          ? 15
          : user?.level == "vvvip"
          ? 20
          : 0,
      treasureType: "minning",
    });

    await User.updateOne(
      { _id: user._id },
      {
        $inc: {
          miningBalance:
            user.level == "vip"
              ? 10
              : user?.level == "vvip"
              ? 15
              : user?.level == "vvvip"
              ? 20
              : 0,
        },
      }
    );

    return redirect("/");
  };

  public getUserTreasures = async () => {
    const userController = await new UserController(this.request);
    const userId = await userController.getUserId();

    let treasures = await Treasure.find({ user: userId }).sort({
      createdAt: -1,
    });

    return treasures;
  };

  public getWithdrawalRequests = async () => {
    const userController = await new UserController(this.request);
    const userId = await userController.getUserId();
    let historyPending = await Withdrawal.find({ status: "pending" })
      .populate("user")
      .sort({
        createdAt: -1,
      });

    let historyFailed = await Withdrawal.find({ status: "failed" })
      .populate("user")
      .sort({
        createdAt: -1,
      });

    return { historyFailed, historyPending };
  };

  public getWithdrawalHistory = async () => {
    const userController = await new UserController(this.request);
    const userId = await userController.getUserId();
    let history = await Withdrawal.find({ user: userId }).sort({
      createdAt: -1,
    });

    return history;
  };

  public withdraw = async ({
    amount,
    bank,
    account,
    accountNumber,
  }: {
    amount: number;
    bank: string;
    account: string;
    accountNumber: string;
  }) => {
    const userController = await new UserController(this.request);
    const userId = await userController.getUserId();

    let user = await User.findOne({ _id: userId });

    const session = await getSession(this.request.headers.get("Cookie"));

    if ((user.referralBalance || user.miningBalance) < amount) {
      session.flash("message", {
        title: "Insufficient Balance",
        description: "Friday, February 10, 2023 at 5:57 PM",
        status: "error",
      });
      return redirect(`/wallet`, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    let inccc = {};
    if (account == "mining") {
      inccc["miningBalance"] = -amount;
    }

    if (account == "referral") {
      inccc["referralBalance"] = -amount;
    }

    await User.updateOne(
      { _id: userId },
      {
        $inc: inccc,
      }
    );

    await Withdrawal.create({
      user: userId,
      amount,
      bank,
      account,
      accountNumber,
    });

    session.flash("message", {
      title: "Withdrawal Successful",
      description: "Friday, February 10, 2023 at 5:57 PM",
      status: "success",
    });
    return redirect(`/wallet`, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  };

  public approveWithdrawal = async ({
    status,
    _id,
  }: {
    status: string;
    _id: string;
  }) => {
    await Withdrawal.findByIdAndUpdate(_id, { status });

    const session = await getSession(this.request.headers.get("Cookie"));

    session.flash("message", {
      title: "Withdrawal Request Changed",
      description: "Friday, February 10, 2023 at 5:57 PM",
      status: "success",
    });
    return redirect(`/console`, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  };

  public rollDice = async ({
    amount,
    predicted,
  }: {
    amount: string;
    predicted: string;
  }) => {
    const session = await getSession(this.request.headers.get("Cookie"));

    const userController = await new UserController(this.request);
    const userId = await userController.getUserId();

    let user = await User.findOne({ _id: userId });

    let dice = Math.floor(Math.random() * 10) + 1;

    if (parseInt(predicted) == dice) {
      await User.updateOne(
        { _id: user._id },
        {
          $inc: {
            miningBalance: parseFloat(amount) / 2,
          },
        }
      );

      await Treasure.create({
        user: user._id,
        amount,
        treasureType: "lottery",
      });

      session.flash("message", {
        title: "You Won",
        description: "Friday, February 10, 2023 at 5:57 PM",
        status: "success",
      });
      return redirect(`/lottery`, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    } else {
      await User.updateOne(
        { _id: user._id },
        {
          $inc: {
            miningBalance: -amount,
          },
        }
      );

      await Treasure.create({
        user: user._id,
        amount,
        operation: "lost",
        treasureType: "lottery",
      });

      session.flash("message", {
        title: "You Lost",
        description: "Friday, February 10, 2023 at 5:57 PM",
        status: "error",
      });
      return redirect(`/lottery`, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  };

  public getLottoHistory = async () => {
    const userController = await new UserController(this.request);
    const userId = await userController.getUserId();

    let treasures = await Treasure.find({
      user: userId,
      treasureType: "lottery",
    }).sort({
      createdAt: -1,
    });

    return treasures;
  };
}
