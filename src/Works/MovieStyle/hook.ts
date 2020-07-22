import { message } from 'antd';
import { colorfulImg, browser } from 'noahsark';
import { emojisSet } from 'utils';

export default function (_this: any) {
	const DraggerProps = {
		name: 'photo',
		accept: 'image/*',
		multiple: false,
		showUploadList: false,
		onChange: () => {
			message.loading({ content: 'Loading...', key: 'loading' });
		},
		beforeUpload: (file: any) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e: any) => {
				message.success({
					content: '加载成功！此操作不会上传任何文件',
					key: 'loading',
				});
				file.thumbUrl = e.target.result;
				const img = new Image();
				img.src = file.thumbUrl;
				img.onload = async (imgEvent: any) => {
					const color = await colorfulImg(img.src);
					const Element = imgEvent.path ? imgEvent.path[0] : imgEvent.target;
					_this.photo = {
						width: Element.width,
						height: Element.height,
						src: Element.src,
						color,
						img,
					};
					_this.drawImage();
					_this.setState({ isLoad: true });
				};
			};
			return false;
		},
	};

	/**
	 * 绘制图片
	 * @param img 图片dom
	 * @param imgInfo 修改参数
	 */
	const drawImage = () => {
		const { photo } = _this;
		if (!photo.width) return;
		const { configData } = _this.state;
		const cav = _this.canvas.current;
		// 初次加载state
		cav.width = photo.width;
		cav.height = photo.height + (configData.bottom + configData.top);
		const ctx: any = cav.getContext('2d');
		ctx.imageSmoothingEnabled = false;

		ctx.drawImage(photo.img, 0, configData.top);
		ctx.fillStyle = configData.color;

		// 上边框
		ctx.fillRect(0, 0, cav.width, configData.top);
		// 下边框
		ctx.fillRect(
			0,
			cav.height - configData.bottom,
			cav.width,
			configData.bottom
		);

		// 处理滑动条
		let opacity = configData.maskOpacity;
		if (String(opacity).length === 1) opacity = '0' + opacity;
		if (configData.maskOpacity === 100) opacity = '';
		// 遮罩蒙板
		ctx.fillStyle = configData.maskColor + opacity;
		ctx.fillRect(0, 0, cav.width, cav.height);

		// 文字
		ctx.fillStyle = configData.fontColor;
		ctx.font = `${configData.fontSize}px Arial`;
		ctx.textBaseline = 'top';

		let str = configData.context; // 文字
		let textWidth: number = 0; // 文字长度 用于给emoji空出位置
		const reg = new RegExp(/\[([^[\]]*)\]/g); // 匹配 []
		const arr = str.match(reg); // 取出 []
		const num = Math.random(); // 用一个随机数用于间隔 emoji  ---ps: 秒啊！

		/**
		 * 显示方位
		 */
		const positionContent = (width: number = 0, preWidth: number = 0) => {
			let positionLrR: number = 0; // 左右
			let positionTrB: number = 0; // 上下
			const { configData } = _this.state;
			// 非正中央显示
			if (!configData.textCenter) {
				// 上下位置
				if (configData.topOrBottom === 'top') {
					positionTrB = configData.top / 2 - configData.fontSize / 2;
				} else {
					positionTrB =
						cav.height - configData.bottom / 2 - configData.fontSize / 2 + 10;
				}
				// 左右位置
				switch (configData.leftOrRight) {
					case 'left':
						positionLrR += configData.padding + width;
						break;
					case 'right':
						positionLrR += width + (cav.width - preWidth) - configData.padding;
						break;
					case 'center':
						positionLrR = cav.width / 2 - (preWidth / 2 - width);
						break;
				}
			} else {
				// 正中央显示
				positionTrB = cav.height / 2 - configData.fontSize / 2;
				positionLrR = cav.width / 2 - (preWidth / 2 - width);
			}
			return { positionLrR, positionTrB };
		};

		// 处理字符串
		if (arr)
			for (let i = 0; i < arr.length; i++) {
				const item = arr[i];
				const name = item.split(reg).join('');
				if (emojisSet[name]) {
					str = str.replace(item, `${num}${name}${num}`);
				}
			}

		const textList = str.split(num);
		const fixSize = browser.isChrome ? 10 : 0; // 修正emoji的高低大小

		let preWidth: number = 0;
		if (/center|right/.test(configData.leftOrRight) || configData.textCenter) {
			for (let i = 0; i < textList.length; i++) {
				const item = textList[i];
				if (item) {
					if (emojisSet[item]) {
						preWidth += configData.fontSize + fixSize;
					} else {
						const text = ctx.measureText(item, 'text');
						preWidth += text.width;
					}
				}
			}
		}

		for (let i = 0; i < textList.length; i++) {
			const item = textList[i];
			if (item) {
				if (emojisSet[item]) {
					const emojie = emojisSet[item];
					emojie.width = configData.fontSize + 'px';
					const fontSize = configData.fontSize + fixSize;
					const { positionLrR, positionTrB } = positionContent(
						textWidth,
						preWidth
					);
					ctx.drawImage(
						emojie,
						positionLrR,
						positionTrB - fixSize,
						fontSize,
						fontSize
					);
					textWidth += fontSize;
				} else {
					const text = ctx.measureText(item, 'text');
					const { positionLrR, positionTrB } = positionContent(
						textWidth,
						preWidth
					);
					ctx.fillText(item, positionLrR, positionTrB);
					textWidth += text.width;
				}
			}
		}
	};

	let time: boolean = true;
	/**
	 * 修改图片信息
	 */
	const changeInfo = (type: string, value: number | string | boolean) => {
		// img更新状态
		if (time) {
			// 先画
			requestAnimationFrame(drawImage);
			if (
				/top|bottom|padding|fontSize/.test(type) &&
				(value === '' || value === null)
			) {
				value = 0;
			}
			const configData = _this.state.configData;
			configData[type] = value;
			_this.setState({ configData });
			localStorage.setItem('configDataProps', JSON.stringify(configData));
			if (!/context/.test(type)) {
				time = false;
				setTimeout(() => (time = true), 50);
			}
		}
	};

	/**
	 * 保存图片
	 */
	const save = () => {
		message.loading({ content: '下载中...', key: 'download' });
		// 移动端提示长按保存图片
		if (browser.mobile) {
			setTimeout(() => {
				_this.imgDom.current.src = _this.canvas.current.toDataURL('image/png');
				setTimeout(() => {
					message.destroy();
					_this.setState({ openModal: true });
				}, 500);
			}, 500);
		} else {
			var aLink = document.createElement('a');
			aLink.download = String(new Date().getTime());
			aLink.href = _this.canvas.current.toDataURL('image/png');
			aLink.click();
			message.success({ content: '无损图下载成功', key: 'download' });
		}
	};

	return { DraggerProps, drawImage, changeInfo, save };
}
