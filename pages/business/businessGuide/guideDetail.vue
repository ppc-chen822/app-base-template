<template>
	<view class="guide-detail-content">
		<view class="big-title">
			<view class="title">{{ detailData.name }}</view>
			<view class="line" />
		</view>

		<view class="basic-info info-con">
			<common-title title="基本信息" />
			<view class="info">
				<view class="left">服务名称：</view>
				<view class="right"> {{ detailData.name }} </view>
			</view>
			<view class="info">
				<view class="left">服务部门：</view>
				<view class="right"> {{ detailData.department }} </view>
			</view>
			<view class="info">
				<view class="left">咨询电话：</view>
				<view class="right"> {{ detailData.tel }} </view>
			</view>
		</view>

		<view class="conditions info-con">
			<common-title title="申诉条件" />
			<view class="conditions-info">
				{{ detailData.conditions }}
			</view>
		</view>

		<view class="material info-con">
			<common-title title="申报材料" />
			<view class="material-info">
				<view class="header">
					<view class="cell" style="width: 20rpx;">序号</view>
					<view class="cell">材料名称</view>
					<view class="cell">规格</view>
					<view class="cell">材料下载</view>
				</view>
				<view class="table-row" v-for="(item, index) in detailData.material" :key="index">
					<view class="cell">{{index + 1}}</view>
					<view class="cell">{{item.name}}</view>
					<view class="cell">{{item.num}}</view>
					<view class="cell">{{item.download}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commonTitle from '@/components/commonTitle/commonTitle.vue'
	import {getGuideOneApi} from '@/api/businessGuide.js'
	export default {
		components: {
			commonTitle
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			uni.setNavigationBarTitle({
				title: option.name
			})
			this.detailData.name=option.name;
			getGuideOneApi(option.id).then(res=>{
				this.detailData.department=res.dept;
				this.detailData.tel=res.phone;
				this.detailData.conditions=res.condition;
			}).catch(err => {
					uni.$u.toast(err)
				})
		},
		data() {
			return {
				detailData: {
					name: '新生儿信息上报',
					department: '村委网格员',
					tel: '13011112222',
					conditions: '新生孩子的户口需要在小孩子出生一个月之内。登记户口本方可提交户口本监护人员信息页面和新生儿登记页面，完成村内新生儿上报。',
					material: [{
						name: '新生儿登记表',
						num: '纸质版一份',
						download: '空表下载'
					}, {
						name: '新生儿登记表',
						num: '纸质版一份',
						download: '空表下载'
					}]
				}
			}
		},
		methods: {
			
		}
	}
</script>
<style>
	page {
		background: #f6f6f6;
	}
</style>
<style lang="scss" scoped>
	.guide-detail-content {
		padding: 30rpx 36rpx;

		.big-title {
			.title {
				color: rgba(56, 56, 56, 1);
				font-size: 32rpx;
				font-weight: 700;
				letter-spacing: 1rpx;
			}

			.line {
				width: 224rpx;
				height: 25rpx;
				background: linear-gradient(270deg, #ffffff 0%, #3186e5 100%);
				margin-top: -18rpx;
				margin-left: -8rpx;
			}
		}

		.info-con {
			background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(235, 244, 255, 1) 100%);
			border-radius: 10px;
			margin: 20rpx 0;
			padding: 32rpx 30rpx;
		}

		.basic-info {
			.info {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-top: 30rpx;

				.left {
					color: #808080;
					font-size: 28rpx;
				}

				.right {
					color: #383838;
					font-size: 26rpx;
				}
			}
		}

		.conditions {
			.conditions-info {
				color: #383838;
				font-size: 28rpx;
				margin-top: 20rpx;
				line-height: 45rpx;
				text-decoration: underline;
			}
		}

		.material {
			.material-info {
				margin-top: 26rpx;

				.header,
				.table-row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					background: #c4dcf8;
					color: #808080;
					font-size: 22rpx;
					height: 60rpx;

					// padding: 0 20rpx;
					.cell {
						text-align: center;
						flex: 1;
					}
				}

				.table-row {
					background: #ffffff;
					color: #383838;
					border: 1rpx solid #edf5ff;
				}
			}
		}
	}
</style>
