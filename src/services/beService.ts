import config from "config";
import { beApi } from "./beAPI";

const PATHS = {
  login: "login",
  signup: "signup",
  videos: "videos",
  logout: "logout",
};

class BeService {
  index: string = config.api.beAPI;
  async login(
    email?: string,
    password?: string
  ): Promise<{ data?: any, err?: any }> {
    return beApi
      .post(this.index + PATHS.login, {
        session: {
          email,
          password,
        },
      })
      .then((data: any) => {
        return data.data;
      })
      .catch((err) => {
        return { err: err.response.data.error};
      });
  }

  async signup(
    username: string,
    email: string,
    password: string
  ): Promise<{ data?: any, err?: any }> {
    return beApi
      .post(this.index + PATHS.signup, {
        user: {
          username,
          email,
          password,
        },
      })
      .then((data: any) => {
        return data.data;
      })
      .catch((err) => {
        return { err: err.response.data.errors };
      });
  }

  async sharevideo(url: string): Promise<{ data?: any, err?: any }> {
    return beApi
      .post(this.index + PATHS.videos, {
        url,
      })
      .then((data: any) => {
        return data.data;
      })
      .catch((err) => {
        return { err: err.response.data.errors };
      });
  }

  async getvideos(page: number): Promise<{ data: any, err: any }> {
    return beApi
      .get(this.index + PATHS.videos, {
        params: {
          page,
        },
      })
      .then((data: any) => {
        return data
      })
      .catch((err) => {
        return { err: err.response.data.error };
      });
  }

  async logout(): Promise<{ data: any; err: any }> {
    return beApi
      .delete(this.index + PATHS.logout)
      .then((data: any) => {
        return data.data;
      })
      .catch((err) => {
        return { err: err.response.data.error };
      });
  }

  async like(videoId: string): Promise<{ data: any, err: any }> {
    return beApi
      .post(this.index + PATHS.videos + `/${videoId}/like`)
      .then((data: any) => {
        return data.data;
      })
      .catch((err) => {
        return { err: err.response.data.error };
      });
  }

  async dislike(videoId: string) {
    return beApi
      .post(this.index + PATHS.videos + `/${videoId}/dislike`)
      .then((data: any) => {
        return data.data;
      })
      .catch((err) => {
        return { err: err.response.data.error };
      });
  }

  async unlike(videoId: string) {
    return beApi
      .delete(this.index + PATHS.videos + `/${videoId}/unlike`)
      .then((data: any) => {
        return data.data;
      })
      .catch((err) => {
        return { err};
      });
  }

  async undislike(videoId: string) {
    return beApi
      .delete(this.index + PATHS.logout + `/${videoId}/undislike`)
      .then((data: any) => {
        return data.data;
      })
      .catch((err) => {
        return { err: err.response.data.error };
      });
  }
}

export const beService = new BeService();
