import {
  type SessionStorage,
  createCookieSessionStorage,
  json,
  redirect,
} from "@remix-run/node";
import bcrypt from "bcryptjs";
// import User from "../models/User";
// import Treasure from "../models/Treasure";

export default class UserController {
  private request: Request;
  private storage: SessionStorage;

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
  }

  private async createUserSession(userId: string, redirectTo: string) {
    const session = await this.storage.getSession();
    session.set("userId", userId);

    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await this.storage.commitSession(session),
      },
    });
  }

  private async getUserSession() {
    return this.storage.getSession(this.request.headers.get("Cookie"));
  }

  public async getUserId() {
    const session = await this.getUserSession();
    const userId = session.get("userId");
    if (!userId || typeof userId !== "string") {
      return undefined;
    }

    return userId;
  }

  public async requireUserId(
    redirectTo: string = new URL(this.request.url).pathname
  ) {
    const session = await this.getUserSession();
    const userId = session.get("userId");
    if (!userId || typeof userId !== "string") {
      const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
      throw redirect(`/login?${searchParams}`);
    }

    return userId;
  }

  /**
   * Get current user
   * @param redirectTo string
   * @returns {user: User}
   */
  public async getUser(
    redirectTo: string = new URL(this.request.url).pathname
  ) {
    const userId = await this.getUserId();
    const user = await User.findById(userId).select("-password");

    if (!user) {
      // const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
      // throw redirect(`/login?${searchParams}`);
      return null;
    }

    return user;
  }

  /**
   * Register a new user
   * @param email string
   * @param password string
   * @returns { user: User }
   */
  public register = async ({
    lastName,
    firstName,
    email,
    password,
    referral = "",
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    referral: string;
  }) => {
    const session = await getSession(this.request.headers.get("Cookie"));

    const userExist = await User.findOne({ email });
    if (userExist) {
      session.flash("message", {
        title: "User already exist",
        description: "Friday, February 10, 2023 at 5:57 PM",
        status: "error",
      });
      return redirect(`/profile`, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      lastName,
      firstName,
      email,
      password: hashedPassword,
      referredBy: referral != "" ? referral : "",
      userGen: Math.random().toString(36).substring(2, 15),
    });

    if (!user) {
      session.flash("message", {
        title: "Error Creating User",
        description: "Friday, February 10, 2023 at 5:57 PM",
        status: "error",
      });
      return redirect(`/profile`, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    return this.createUserSession(user.id, "/");
  };

  /**
   * Login an user
   * @param email string
   * @param password string
   * @returns { user: User }
   */
  public login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const session = await getSession(this.request.headers.get("Cookie"));

    const user = await User.findOne({ email });

    if (!user) {
      session.flash("message", {
        title: "No user found",
        description: "Friday, February 10, 2023 at 5:57 PM",
        status: "error",
      });
      return redirect(`/login`, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      session.flash("message", {
        title: "Incorrect Password",
        description: "Friday, February 10, 2023 at 5:57 PM",
        status: "error",
      });
      return redirect(`/login`, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    return await this.createUserSession(user.id, "/");
  };

  public update = async ({
    firstName,
    lastName,
    email,
    phone,
  }: {
    firstName?: string;
    lastName?: string;
    email: string;
    phone: string;
  }) => {
    const userId = await this.getUserId();
    const session = await getSession(this.request.headers.get("Cookie"));

    try {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          email,
          firstName,
          lastName,
          phone,
        }
      );

      session.flash("message", {
        title: "Profile Updated ",
        description: "Friday, February 10, 2023 at 5:57 PM",
        status: "success",
      });
      return redirect(`/profile`, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    } catch (error) {
      console.log(error);

      session.flash("message", {
        title: "Error Updating Profile",
        description: "Friday, February 10, 2023 at 5:57 PM",
        status: "error",
      });
      return redirect(`/profile`, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  };

  public changePassword = async ({
    current_password,
    password,
  }: {
    current_password: string;
    password: string;
  }) => {
    const userId = await this.getUserId();
    const user = await User.findById(userId);
    const session = await getSession(this.request.headers.get("Cookie"));

    if (user) {
      const valid = await bcrypt.compare(current_password, user.password);

      if (!valid) {
        session.flash("message", {
          title: "Current Password is Incorrect",
          description: "Friday, February 10, 2023 at 5:57 PM",
          status: "error",
        });
        return redirect(`/profile`, {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        { _id: user._id },
        {
          password: hashedPassword,
        }
      );

      session.flash("message", {
        title: "Password Changed",
        description: "Friday, February 10, 2023 at 5:57 PM",
        status: "success",
      });
      return redirect(`/profile`, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    } else {
      return json(
        {
          error: "Incorrect Password",
          fields: { password },
        },
        { status: 400 }
      );
    }
  };

  /**
   * Logout an user
   * @returns { user: User }
   */
  public logout = async () => {
    const session = await this.getUserSession();

    return redirect("/login", {
      headers: {
        "Set-Cookie": await this.storage.destroySession(session),
      },
    });
  };

  public getUsers = async ({ search_term }: { search_term: string }) => {
    const searchFilter = search_term
      ? {
          $or: [
            { userGen: { $regex: search_term, $options: "i" } },
            { firstName: { $regex: search_term, $options: "i" } },
            { lastName: { $regex: search_term, $options: "i" } },
            { email: { $regex: search_term, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(searchFilter);
    return users;
  };

  public getUserReferrals = async () => {
    const userId = await this.getUserId();
    const users = await User.find({ referredBy: userId });
    return users;
  };

  public upgrade = async ({
    userId,
    level,
  }: {
    userId: string;
    level: string;
  }) => {
    const user = await User.findById(userId);

    if (user.referredBy != "" && user.firstUpgrade == false) {
      await Treasure.create({
        user: user.referredBy,
        amount: level == "vip" ? 45 : level == "vvip" ? 75 : 100,
        treasureType: "referral",
      });

      await User.findByIdAndUpdate(user.referredBy, {
        $inc: {
          referralBalance: level == "vip" ? 45 : level == "vvip" ? 75 : 100,
        },
      });
    }

    await User.findByIdAndUpdate(userId, {
      level,
      firstUpgrade: true,
      $inc: {
        miningBalance: 10,
      },
    });
    await Treasure.create({
      user: userId,
      amount: 10,
      treasureType: "bonus",
    });
    const session = await getSession(this.request.headers.get("Cookie"));

    session.flash("message", {
      title: "Upgrade Successful",
      description: "Friday, February 10, 2023 at 5:57 PM",
      status: "success",
    });
    return redirect(`/upgrade`, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  };

  public adminUpgrade = async ({
    userId,
    level,
  }: {
    userId: string;
    level: string;
  }) => {
    const user = await User.findById(userId);

    if (user.referredBy != "" && user.firstUpgrade == false) {
      await Treasure.create({
        user: user.referredBy,
        amount: level == "vip" ? 45 : level == "vvip" ? 75 : 100,
        treasureType: "referral",
      });

      await User.findByIdAndUpdate(user.referredBy, {
        $inc: {
          referralBalance: level == "vip" ? 45 : level == "vvip" ? 75 : 100,
        },
      });
    }

    await User.findByIdAndUpdate(userId, {
      level,
      firstUpgrade: true,
      $inc: {
        miningBalance: 10,
      },
    });
    await Treasure.create({
      user: userId,
      amount: 10,
      treasureType: "bonus",
    });
    const session = await getSession(this.request.headers.get("Cookie"));

    session.flash("message", {
      title: "Upgrade Successful",
      description: "Friday, February 10, 2023 at 5:57 PM",
      status: "success",
    });
    return redirect(`/console/upgrade`, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  };
}
