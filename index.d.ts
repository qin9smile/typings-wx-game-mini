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
    addEventListener: (type: string, listener: any, options?: Object) => void;
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

  interface Touch {

    /**
     * 此 Touch 对象的唯一标识符. 
     * 一次触摸动作(我们值的是手指的触摸)在平面上移动的整个过程中, 该标识符不变. 
     * 可以根据它来判断跟踪的是否是同一次触摸过程. 
     * 只读属性.
     */
    identifier: string;

    /**
     * 触点相对于屏幕左边沿的的X坐标. 
     * 只读属性.
     */
    screenX: number;

    /**
     * 触点相对于屏幕上边沿的的Y坐标. 
     * 只读属性.
     */
    screenY: number;

    /**
     * 触点相对于可见视区(visual viewport)左边沿的的X坐标. 不包括任何滚动偏移. 
     * 只读属性.
     */
    clientX: number;

    /**
     * 触点相对于可见视区(visual viewport)上边沿的的Y坐标. 
     * 不包括任何滚动偏移. 只读属性.
     */
    clientY: number;

    /**
     * 触点相对于HTML文档左边沿的的X坐标. 
     * 当存在水平滚动的偏移时, 这个值包含了水平滚动的偏移. 
     * 只读属性.
     */
    pageX: number;

    /**
     * 触点相对于HTML文档上边沿的的Y坐标. 
     * 当存在垂直滚动的偏移时, 这个值包含了垂直滚动的偏移. 
     * 只读属性.
     */
    pageY: number;

    /**
     * 能够包围用户和触摸平面的接触面的最小椭圆的水平轴(X轴)半径. 
     * 这个值的单位和 screenX 相同. 只读属性.
     */
    radiusX: number;

    /**
     * 能够包围用户和触摸平面的接触面的最小椭圆的垂直轴(Y轴)半径. 
     * 这个值的单位和 screenY 相同. 
     * 只读属性.
     */
    radiusY: number;

    /**
     * 它是这样一个角度值：由radiusX 和 radiusY 描述的正方向的椭圆，
     * 需要通过顺时针旋转这个角度值，才能最精确地覆盖住用户和触摸平面的接触面. 
     * 只读属性.
     */
    rotationAngle: number;

    /**
     * 手指挤压触摸平面的压力大小, 从0.0(没有压力)到1.0(最大压力)的浮点数. 
     * 只读属性.
     */
    force: number;

    /**
     * 当这个触点最开始被跟踪时(在 touchstart 事件中), 触点位于的HTML元素. 
     * 哪怕在触点移动过程中, 触点的位置已经离开了这个元素的有效交互区域, 
     * 或者这个元素已经被从文档中移除. 
     * 需要注意的是, 如果这个元素在触摸过程中被移除, 这个事件仍然会指向它, 
     * 但是不会再冒泡这个事件到 window 或 document 对象. 
     * 因此, 如果有元素在触摸过程中可能被移除, 最佳实践是将触摸事件的监听器绑定到这个元素本身,
     * 防止元素被移除后, 无法再从它的上一级元素上侦测到从该元素冒泡的事件. 
     * 只读属性.
     */
    target: any;
  }

  interface TouchEvent extends BaseEvent {
    touches: Touch[];
  }
}