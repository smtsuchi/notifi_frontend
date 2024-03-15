
import { UserType } from "../entities/UserType";
import { BaseResponse } from "./baseResponse";

export interface LoginResponse extends BaseResponse {
    user: UserType,
    access_token: string;
}