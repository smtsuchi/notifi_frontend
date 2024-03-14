
import { UserType } from "../entities/UserType";
import { BaseResponse } from "./baseResponse";

export interface UserResponse extends BaseResponse {
    user: UserType,
}