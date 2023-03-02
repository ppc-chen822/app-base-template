<template>
	<view class="category">
		<view class="nav">
			<scroll-view class="bg" scroll-y="true">
				<view class="nav-item" :class="{'ac':active == index}" v-for="(item,index) in tabData" :key="index"
					@click="changeNav(index)">
					{{item.name}}
				</view>
			</scroll-view>
		</view>
		<view class="goodsBox">
			<scroll-view scroll-y="true">
				<view class="goods">
					<view class="goods-item" v-for="(item,index) in tabData" :key="index">
						<text style="padding-left: 10rpx;">{{item.title}}</text>
						<text style="font-family:SimHei;font-weight:bold;padding-left: 10rpx;">{{item.title2}}</text>
						<view class="fenge">
							<text class="fengeq"/>
							{{item.name}}
							<text class="fengeh"/>
						</view>
						<navigator v-for="i in item.goods" :key="i.url" :url="i.url" >
							<image class="image" :src="i.img" />
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'left-swipe-tab',
		props:{
			tabData:{
				type:Array,
				default: () => []
			}
		},
		data() {
			return {
				active: 0,
				arr: [],
			}
		},
		created() {
			this.getMenuItemTop();
		},
		methods: {
			changeNav(index) {
				this.active = index;
				uni.pageScrollTo({
					scrollTop: this.arr[index],
					duration: 150
				});
			},

			getMenuItemTop() {
				console.log('进来');
				this.$nextTick(() => {
					let selectorQuery = uni.createSelectorQuery().in(this);
					// console.log('selectorQuery:',selectorQuery);
					selectorQuery.selectAll('.goods-item').boundingClientRect((rects) => {
						// console.log('rects:',JSON.stringify(rects));
						rects.forEach((rect) => {
							console.log('rect.top:',rect.top);
							this.arr.push(rect.top - rects[0].top);
						})
					}).exec()
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	// 左侧导航背景颜色
	$leftbackground:#F7F8F9;
	//左侧导航文字颜色
	$leftcolor:#505660;
	//左侧选中背景
	$leftacbg:#505660;
	//左侧选中文字颜色
	$leftacclo:#fff;
	.fenge{
		padding: 8rpx 0;
		.fengeq{
			display: inline-block;
			padding-top : 10rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
			width: 10%;
			border-top: 1px solid #ddd;
		}
		.fengeh{
			display: inline-block;
			padding-top : 10rpx;
			margin-left: 10rpx;
			width: 50%;
			border-top: 1px solid #ddd;
		}
	}
	
	.category {
		background-color: #ffffff;
		position:absolute;
		top:0;
		//左侧导航样式
		.nav {
			position: fixed;
			left: 0;
			/*  #ifdef  H5  */
			top: 88rpx;
			/*  #endif  */
			overflow: scroll;
			height:85%;
			.bg {
				width: 200rpx;
				.nav-item {
					width: 200rpx;
					height: 104rpx;
					line-height: 104rpx;
					background: $leftbackground;
					font-size: 28rpx;
					color: $leftcolor;
					text-align: center;
				}
				//选中的样式
				.ac {
					color: $leftacclo;
					font-size: 30rpx;
					background: $leftacbg;
				}
			}
		}
		// 商品样式
		.goodsBox {
			position: relative;
			left: 200rpx;
			width: 550rpx;
			// padding-bottom: 90rpx;
			.goods-item{
				margin-bottom: 20rpx;
				padding-top: 20rpx;
				background-color: #fff;
				.image {
					margin: 0 25rpx;
					width: 500rpx;
					height: 300rpx;
					border-radius: 20rpx;
					margin-bottom: 5rpx;
				}
			}
		}
	}
</style>