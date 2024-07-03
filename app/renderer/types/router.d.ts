import React from "react";

declare namespace TSRouter {
  export interface Router {
    /**
     * @description 路由跳转链接
     */
    path: string;
    /**
     * @description ReactNode
     */
    element: React.ReactNode;
    /**
     * @description 嵌套路由
     */
    children?: TSRouter.Router[]
  }
}
