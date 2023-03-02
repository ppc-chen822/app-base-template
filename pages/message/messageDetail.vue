<template>
	<view class="page-container">
		<view class="content" v-for="item,index in items" :key="item.index">
			<image class="img" :src="nav.icon"></image>
			<view class="info">
				<view class="detail"><text>{{item.detail}}</text></view>
				<view class="time" v-if="item.time">
					<u--text size="24rpx" color="#A6A6A6" align="center" :text="item.time"></u--text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
				items: [{
						detail: '6月29日下午18点45分，社区将开展灭菌灭活的全面消杀工作，届时请您关好自家门窗并将老人和小孩安置在较为稳妥的房间，防止消杀中的气体入室造成不适。',
						time: '39分钟前',
					},
					{
						detail: '6月29日下午18点45分，社区将开展灭菌灭活的全面消杀工作，届时请您关好自家门窗并将老人和小孩安置在较为稳妥的房间，防止消杀中的气体入室造成不适。',

					},
					{
						detail: '6月29日下午18点45分，社区将开展灭菌灭活的全面消杀工作，届时请您关好自家门窗并将老人和小孩安置在较为稳妥的房间，防止消杀中的气体入室造成不适。',
						time: '',
					},
				],
			}
		},
		computed: {
			nav: function() {
				switch (this.type) {
					case 'unhandle':
						return {icon:`${this.imgUrl}/message/unhandle.png`,
						name:'待办事项',}
					case 'system':
						return {icon:`${this.imgUrl}/message/system.png`,
						name:'系统通知',}
					case 'work':
						return {icon:`${this.imgUrl}/message/work.png`,
						name:'工作安排',}
					case 'community':
						return {icon:`${this.imgUrl}/message/community.png`,
						name:'社区通知',}
					case 'temporary':
						return {icon:`${this.imgUrl}/message/temporary.png`,
						name:'临时会话',}
					default:
						return {icon:`${this.imgUrl}/message/unhandle.png`,
						name:'待办事项',}
				}
			}
		},
		
		onLoad(obj) {
			this.type = obj.type;
		},
		onReady(){
			uni.setNavigationBarTitle({
				title: this.nav.name
			});
		},
		methods: {

		}
	}
</script>

<style>
	page{
		background-color: #F6F6F6;
	}
</style>
<style lang="scss" scoped>
	.page-container {
		padding: 64rpx 34rpx 0 34rpx;

		.content {
			display: flex;

			.img {
				width: 72rpx;
				height: 72rpx;
				flex-shrink: 0;
			}

			.info {
				
				padding: 0 28rpx 0 22rpx;
				margin-bottom: 60rpx;
				display: flex;
				flex-direction: column;

				.detail {
					background-color: #ffffff;
					border-radius: 10px;
					padding: 24rpx 38rpx 24rpx 28rpx;
					font-size: 26rpx;
					font-weight: 500;
					text-align: justify;
					line-height: 40rpx;
				}

				.time {
					padding-top: 26rpx;
					padding-bottom: 18rpx;
				}
			}
		}
	}
</style>
