import config from "config";
import { beApi } from "./beAPI";

const PATHS = {
  login: "login",
  signup: "signup",
  videos: 'videos',
  logout: 'logout'
};

class BeService {
  index: string = config.api.beAPI;
  async login(
    email: string,
    password: string,
    
  ): Promise<{ data: { session_token: string; email: string } }> {
    return beApi.post(this.index + PATHS.login, {
      session: {
        email,
        password,
      }
    }).then((data: any)=>data.data);
  }

  async signup(
    username: string,
    email: string,
    password: string
  ): Promise<{ data: { id: string } }> {
    return beApi.post(this.index + PATHS.signup, {
      user: {
        username,
        email,
        password,
      },
    });
  }

  async sharevideo(
    url: string,
  ): Promise<{ data: { id: string } }> {
    return beApi.post(this.index + PATHS.videos, {
      url
    }).then((data: any)=>data.data);
  }

  async getvideos(
    page: number,
    
  ): Promise<{ data: any[] }> {
    return beApi.get(this.index + PATHS.videos, {
      params: {
        page
      }
    }).then((data: any)=>data.data);
  }

  async logout(): Promise<{ data: { id: string } }> {
    return beApi.delete(this.index + PATHS.logout);
  }

  async like(videoId: string) {
    return beApi.post(this.index + PATHS.videos+`/${videoId}/like`);
  }

  async dislike(videoId: string) {
    return beApi.post(this.index + PATHS.videos+`/${videoId}/dislike`);
  }

  async unlike(videoId: string) {
    return beApi.delete(this.index + PATHS.logout+`/${videoId}/unlike`);
  }

  async undislike(videoId: string) {
    return beApi.delete(this.index + PATHS.logout+`/${videoId}/undislike`);
  }
  
}

export const beService = new BeService();
