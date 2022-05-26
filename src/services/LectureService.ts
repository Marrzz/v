import httpClient from "../api/http-client";
import { AccountService } from "./AccountService";

export class LectureService {
  userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  getLecturesByCourse = async (courseId: string) => {
    try {
      let res = await httpClient.get(`/lectures/course/${courseId}`, {
        headers: {
          Authorization: "bearer " + this.userInfo.token,
        },
      });
      return res.data as any;
    } catch (e) {
      let response = e.response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [] as any;

        let response = await httpClient.get(`/lectures/course/${courseId}`, {
          headers: {
            Authorization: "bearer " + this.userInfo?.token,
          },
        });

        let res = response.data;
        return res;
      }
    }
  };
}
