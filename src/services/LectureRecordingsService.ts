import type { ILecture } from "@/domain/ILecture";
import httpClient from "../api/http-client";
import { AccountService } from "./AccountService";

export class LectureRecordingsService {
  userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  getAll = async (): Promise<ILecture[]> => {
    try {
      let res = await httpClient.get("/lecturerecordings", {
        headers: {
          Authorization: "bearer " + this.userInfo.token,
        },
      });
      return res.data as ILecture[];
    } catch (e) {
      let response = e.response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [] as any;

        let response = await httpClient.get(`/lecturerecordings`, {
          headers: {
            Authorization: "bearer " + this.userInfo?.token,
          },
        });

        let res = response.data;
        return res;
      }
    }
  };

  getLectures = async (lectureRecId: string): Promise<ILecture[]> => {
    try {
      let res = await httpClient.get(`/lecturerecordings/${lectureRecId}`, {
        headers: {
          Authorization: "bearer " + this.userInfo.token,
        },
      });
      return res.data as ILecture[];
    } catch (e) {
      let response = e.response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [] as any;

        let response = await httpClient.get(
          `/lecturerecordings/${lectureRecId}`,
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
  };

  getByCourse = async (courseId: string): Promise<ILecture> => {
    try {
      let res = await httpClient.get(`/Lectures/Course/${courseId}`, {
        headers: {
          Authorization: "bearer " + this.userInfo.token,
        },
      });
      return res.data as ILecture;
    } catch (e) {
      let response = e.response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [] as any;

        let response = await httpClient.get(`/Lectures/Course/${courseId}`, {
          headers: {
            Authorization: "bearer " + this.userInfo?.token,
          },
        });

        let res = response.data;
        return res;
      }
    }
  };

  getLectureRecording = async (lectureId: string) => {
    try {
      let res = await httpClient.get(
        `/lecturerecordings/Lecture/${lectureId}`,
        {
          headers: {
            Authorization: "bearer " + this.userInfo.token,
          },
        }
      );
      return res.data as any;
    } catch (e) {
      let response = e.response!;
      if (response.status == 401 && this.userInfo) {
        const identityService = new AccountService();
        const refreshResponse = await identityService.refreshIdentity();
        this.userInfo = refreshResponse.data!;

        if (!this.userInfo.jwt) return [] as any;

        let response = await httpClient.get(
          `/lecturerecordings/Lecture/${lectureId}`,
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
  };
}
