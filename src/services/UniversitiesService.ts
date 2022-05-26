import type { IUniversity } from "@/domain/IUniversity";
import httpClient from "../api/http-client";
import { AccountService } from "./AccountService";

export class UniversitiesService {
  userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  getAll = async (): Promise<IUniversity[]> => {
    try {
      let res = await httpClient.get("/universities", {
        headers: {
          Authorization: "bearer " + this.userInfo.token,
        },
      });
      return res.data as IUniversity[];
    } catch (e) {
      let response = e.response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [] as any;

        let response = await httpClient.get("/universities", {
          headers: {
            Authorization: "bearer " + this.userInfo?.token,
          },
        });

        let res = response.data;
        return res;
      }
    }
  };

  getUniversity = async (id: string): Promise<IUniversity[]> => {
    try {
      let res = await httpClient.get(`/universities/${id}`, {
        headers: {
          Authorization: "bearer " + this.userInfo.token,
        },
      });
      return res.data as IUniversity[];
    } catch (e) {
      let response = e.response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [] as any;

        let response = await httpClient.get(`/universities/${id}`, {
          headers: {
            Authorization: "bearer " + this.userInfo?.token,
          },
        });

        let res = response.data;
        return res;
      }
    }
  };

  getCourses = async (uniId: string): Promise<any> => {
    try {
      let res = await httpClient.get(`/courses/university/${uniId}`, {
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

        let response = await httpClient.get(`/courses/university/${uniId}`, {
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
