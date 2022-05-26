import type { IActiveCourse } from "@/domain/IActiveCourse";
import type { AxiosError } from "axios";
import httpClient from "../api/http-client";
import { AccountService } from "./AccountService";

export class CourseService {
  userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  getAll = async (): Promise<IActiveCourse[]> => {
    try {
      let res = await httpClient.get("/courseswithaprofessor", {
        headers: {
          Authorization: "bearer " + this.userInfo.token,
        },
      });
      return res.data as IActiveCourse[];
    } catch (e) {
      let response = (e as AxiosError).response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [];

        let response = await httpClient.get(`/courseswithaprofessor`, {
          headers: {
            Authorization: "bearer " + this.userInfo?.token,
          },
        });

        let res = response.data;
        return res;
      }
      return null as any;
    }
  };

  getCoursesByUniversity = async (
    universityId: string
  ): Promise<IActiveCourse[]> => {
    try {
      let res = await httpClient.get(
        `/courseswithaprofessor/university/${universityId}`,
        {
          headers: {
            Authorization: "bearer " + this.userInfo.token,
          },
        }
      );
      return res.data as IActiveCourse[];
    } catch (e) {
      let response = (e as AxiosError).response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [];

        let response = await httpClient.get(
          `/courseswithaprofessor/university/${universityId}`,
          {
            headers: {
              Authorization: "bearer " + this.userInfo?.token,
            },
          }
        );

        let res = response.data;
        return res;
      }
    }
    return null as any;
  };
  getAllActiveCoursesByUniversity = async (
    universityId: string
  ): Promise<IActiveCourse[]> => {
    try {
      let res = await httpClient.get(
        `/courseswithaprofessor/university/active/${universityId}`,
        {
          headers: {
            Authorization: "bearer " + this.userInfo.token,
          },
        }
      );
      return res.data as IActiveCourse[];
    } catch (e) {
      let response = (e as AxiosError).response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [];

        let response = await httpClient.get(
          `/courseswithaprofessor/university/active/${universityId}`,
          {
            headers: {
              Authorization: "bearer " + this.userInfo?.token,
            },
          }
        );

        let res = response.data;
        return res;
      }
    }
    return null as any
  };
  getCourse = async (courseId: string): Promise<IActiveCourse> => {
    try {
      let res = await httpClient.get(`/courseswithaprofessor/${courseId}`, {
        headers: {
          Authorization: "bearer " + this.userInfo.token,
        },
      });
      return res.data;
    } catch (e) {
      let response = (e as AxiosError).response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [] as any;

        let response = await httpClient.get(
          `/courseswithaprofessor/${courseId}`,
          {
            headers: {
              Authorization: "bearer " + this.userInfo?.token,
            },
          }
        );

        let res = response.data;
        return res;
      }
    }
    return null as any
  };
}
