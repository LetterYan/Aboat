import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { SideBar, WorksList } from 'components';
import { colorfulImg } from 'noahsark';
import style from './style.module.less';

const imgList = require
	.context('static/image/carousel/')
	.keys()
	.map((str: string) => ({
		path: require(`static/image/carousel/${str.replace('./', '')}`),
		color: '',
	}));

export default function Home() {
	const [current, setCurrent] = useState(0);
	const [bgColor, setBgColor] = useState('');

	useEffect(() => {
		const getColor = async () => {
			if (imgList[current].color) {
				setBgColor(imgList[current].color);
			} else {
				imgList[current].color = await colorfulImg(imgList[current].path);
				setBgColor(imgList[current].color);
			}
		};
		getColor();
	}, [current]);

	return (
		<>
			<div className={style.Wrapper}>
				<div className={style.Content}>
					<div className={style.Layout}>
						<SideBar />
						<div className={style.CarouselBox}>
							<Carousel autoplay beforeChange={(f, t) => setCurrent(t)}>
								{imgList.map(
									({ path }) => path && <img alt='' key={path} src={path} />
								)}
							</Carousel>
						</div>
					</div>
				</div>
				<WorksList />
			</div>
			<div className={style.BgCarousel} style={{ backgroundColor: bgColor }} />
		</>
	);
}
