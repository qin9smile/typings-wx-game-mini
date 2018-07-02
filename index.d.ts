// Copyright 2018 Charlotte Wang (hotstrip@yahoo.com). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

declare namespace wx {

  /**
   * ---------- 渲染 - 画布 ----------
   */

  interface TempFileSuccessResponse {
    /**
     * canvas 生成的临时文件路径
     */
    tempFilePath: string;
  }

  interface TempFileOption {
    /**
     * 截取 canvas 的左上角横坐标
     * 默认 0
     */
    x?: number;

    /**
     * 截取 canvas 的左上角纵坐标
     * 默认 0
     */
    y?: number;

    /**
     * 截取 canvas 的宽度	
     * 默认值: canvas的宽度
     */
    width?: number;

    /**
     * 截取 canvas 的高度
     * 默认值: canvas 的高度
     */
    height?: number;

    /**
     * 目标文件的宽度，会将截取的部分拉伸或压缩至该数值
     * 默认值： canvas的宽度
     */
    destWidth?: number;

    /**
     * 目标文件的高度，会将截取的部分拉伸或压缩至该数值
     * 默认值：canvas的高度
     */
    destHeight?: number;

    /**
     * 目标文件的类型	
     * 默认 png
     */
    fileType?: "png" | "jpg";

    /**
     * jpg图片的质量，仅当 fileType 为 jpg 时有效。
     * 取值范围为 0.0（最低）- 1.0（最高），不含 0。不在范围内时当作 1.0
     * 默认值：1.0
     */
    quality?: number;

    /**
     * 接口调用成功的回调函数	
     */
    success?: (res: TempFileSuccessResponse) => void;

    /**
     * 接口调用失败的回调函数	
     */
    fail?: Function;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    completion?: Function;
  }

  interface ContextAttributes {
    /**
     * 表示是否抗锯齿
     * 默认值：false
     */
    antialias?: Boolean;

    /**
     * 表示是否绘图完成后是否保留绘图缓冲区
     * 默认值：false
     */
    preserveDrawingBuffer?: Boolean;

    /**
     * 抗锯齿样本数。最小值为 2，最大不超过系统限制数量，仅 iOS 支持
     * 默认值：false
     */
    antialiasSamples?: number;
  }

  /**
   * 通过 Canvas.getContext('2d') 接口可以获取 CanvasRenderingContext2D 对象。
   * CanvasRenderingContext2D 实现了 HTML Canvas 2D Context 定义的大部分属性、方法。
   * 通过 Canvas.getContext('webgl') 接口可以获取 WebGLRenderingContext 对象。 
   * WebGLRenderingContext 实现了 WebGL 1.0 定义的所有属性、方法、常量。
   */
  interface RenderingContext {
    /**
     * 将一个 Canvas 对应的 Texture 绑定到 WebGL 上下文。
     */
    wxBindCanvasTexture: (texture: number, canvas: Canvas) => void;
  }

  interface Canvas extends Canvas2DContext {
    /**
     * 画布的宽度
     */
    width: number;

    /**
     * 画布的高度
     */
    height: number;

    /**
     * 将当前 Canvas 保存为一个临时文件，并生成相应的临时文件路径。
     * @return canvas生成的临时文件路径
     */
    toTempFilePath(options: wx.TempFileOption): string;

    /**
     * 获取画布对象的绘图上下文
     * @return 绘图上下文
     */
    getContext: (contextType: "2d" | "webgl", options: wx.ContextAttributes) => RenderingContext;

    /**
     * 把画布上的绘制内容以一个 data URI 的格式返回
     * @return data URI格式的字符串
     */
    toDataURL(): string;

    /**
     * Canvas.toTempFilePath 的同步版本
     * @return canvas生成的临时文件路径
     */
    toTempFilePathSync(options: wx.TempFileOption): string;

    // TODO: - WebglRendering bindCanvasTexture
  }

  function createCanvas(contextType: "2d" | "webgl"): Canvas;

  /**
   * ---------- 系统 - 系统信息 ----------
   */

  /**
   * 系统信息
   */
  interface SystemInfo {
    brand: string;
    model: string;
    pixelRatio: number;
    screenWidth: number;
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
    statusBarHeight: number;
    language: string;
    version: string;
    system: string;
    platform: string;
    fontSizeSetting: string;
    SDKVersion: string;
  }

  interface SystemInfoOptions {
    success: (systemInfo: SystemInfo) => void;
    fail?: Function;
    complete?: Function;
  }

  function getSystemInfo(options: SystemInfoOptions): void;


  function getSystemInfoSync(): SystemInfo;


  /**
   * ---------- 开放接口 - 设置 ----------
   */

  interface SettingSuccessResponse {
    authSetting: AuthSetting;
  }

  type Scope = "scope.userInfo" |
    "scope.userLocation" |
    "scope.address" |
    "scope.invoiceTitle" |
    "scope.werun" |
    "scope.record" |
    "scope.writePhotosAlbum" |
    "scope.camera";

  type AuthSetting = {
    [key in Scope]: boolean;
  }

  interface SettingOptions {
    success: (res: SettingSuccessResponse) => void;

    fail?: Function;

    complete?: Function;
  }

  function getSetting(options: SettingOptions): void;

  function openSetting(options: SettingOptions): void;

  /**
   * ---------- 开放接口 - 授权 ----------
   */

  interface AuthorizeOptions {
    scope: Scope;
    success?: (errMessage: string) => void;
    fail?: Function;
    complete?: Function;
  }

  function authorize(options: AuthorizeOptions): void;


  interface BaseEvent {
    /**
     * 事件类型
     */
    type: string;

    /**
     * 事件生成时的时间戳
     */
    timeStamp: number;

    /**
     * 触发事件的组件的一些属性值集合
     */
    target: any;

    /**
     * 当前组件的一些属性值集合
     */
    currentTarget: any;
  }

  /**
   * ---------- RenderingContext - Canvas 2D Context ----------
   */

  interface Canvas2DContext extends EventTarget {
  drawImage: Function;
  }

  interface EventTarget {
    addEventListener: (type: string, listener: any, options: Object) => void;
  }

  /**
   * ---------- 事件 ----------
   */

  interface BaseEvent {
    /**
     * 事件类型
     */
    type: string;


    /**
     * 事件生成时的时间戳
     */
    timeStamp: number;

    /**
     * 触发事件的组件的一些属性值集合
     */
    target: any;

    /**
     * 当前组件的一些属性值集合
     */
    currentTarget: any;

    preventDefault: Function;
  }
}