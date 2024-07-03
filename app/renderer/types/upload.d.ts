declare namespace TSMyUpload {
  export interface File {
    /**
     * @description 文件
     */
    file: unknown;
    /**
     * @description 文件名
     */
    name: string;
    /**
     * @description 文件大小
     */
    size?: number;
    /**
     * @description 文件类型
     */
    fileType?: string;
    /**
     * @description 本地文件预览地址
     */
    localPreviewURL?: string;
    /**
     * @description 上传
     */
    upload?: () => Promise<unknown> | void;

  }

  export type TInput = {
    /**
     * @description 描述文字
     */
    title: string;
    /**
     * @description 上传的文件类型
     */
    accept: string;
    /**
     * @description 是否支持多选
     */
    multiple: boolean;
    /**
     * @description 文件改变的回调
     */
    onAfterChange?: (fileList: TSMyUpload.File[]) => void
  }
}
