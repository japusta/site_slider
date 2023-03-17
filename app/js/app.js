import {Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation} from 'swiper'
import {gsap, Power2} from 'gsap'
import MicroModal from 'micromodal'

Swiper.use([Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation])

document.addEventListener('DOMContentLoaded', () => {

	//modal 

	MicroModal.init({
		openTrigger: 'data-micromodal-open',
		closeTrigger: 'data-micromodal-close',
		disableFocus: true,
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true

	})

	const SwiperImg = new Swiper('.slider-img',{
		loop: false,
		speed: 2400,
		parallax: true,
		pagination: {
			el: '.slider-pagination-count .total',
			type: 'custom',
			renderCustom: function(swiper, current, total){
				let TotalRes = total >= 10 ? total : `0${total}`
				return TotalRes
			}
		},
		mousewheel: {
			invert: false,
		}
	})

	const SwiperText = new Swiper('.slider-text',{
		loop: false,
		speed: 2400,
		mousewheel: {
			invert: false,
		}, 
		pagination: {
			el: '.swiper-pagination',
			clickable: true 
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
	})

	SwiperImg.controller.control = SwiperText
	SwiperText.controller.control = SwiperImg

	let gear = document.querySelector('.slider-gear')

	SwiperText.on('slideNextTransitionStart', function(){
		gsap.to(gear, 2.8, {
			rotation: '+=40',
			ease: Power2.easeOut
		})
	})

	SwiperText.on('slidePrevTransitionStart', function(){
		gsap.to(gear, 2.8, {
			rotation: '-=40',
			ease: Power2.easeOut
		})
	})


	//slide change
	let CurNum = document.querySelector('.slider-pagination-count .current')
	let PageCur = document.querySelector('.slider-pagination-current__num')

	SwiperText.on('slideChange', function(){

		let index = SwiperText.realIndex + 1
		let IndexRes = index >= 10 ? index : `0${index}`
		gsap.to(CurNum, .2, {
			force3D: true,
			y: -10,
			opacity: 0,
			ease: Power2.easeOut, 

			onComplete: function(){
				gsap.to(CurNum, .1, {
					force3D: true,
					y: 10
				})
				CurNum.innerHTML = IndexRes
				PageCur.innerHTML = IndexRes
			}
		})
		gsap.to(CurNum, .2, {
			force3D: true, 
			y: 10,
			opacity: 1,
			ease: Power2.easeOut,
			delay: .3
		})
	})

	//cursor
	
	const body = document.querySelector('body')
	const cursor = document.getElementById('cursor')
	const links = document.getElementsByTagName('a')

	let mouseX = 0, mouseY = 0, posX = 0, posY = 0

	function MouseCoords(e){
		mouseX = e.pageX
		mouseY = e.pageY
	}

	gsap.to({}, .01, {
		repeat: -1,
		onRepeat: () => {
			posX += (mouseX - posX) / 6
			posY += (mouseY - posY) / 6
			gsap.set(cursor, {
				css: {
					left: posX,
					top: posY
				}
			})
		}
	})

	for(let i = 0; i < links.length; i++){
		links[i].addEventListener('mouseover', () => {
			cursor.classList.add('active')
		})

		links[i].addEventListener('mouseout', () => {
			cursor.classList.remove('active')
		})
	}

	body.addEventListener('mousemove', e => {
		MouseCoords(e)
		cursor.classList.remove('hidden')
	})

	body.addEventListener('mouseout', e => {
		cursor.classList.add('hidden')
	})
})
