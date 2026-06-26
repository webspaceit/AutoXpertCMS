import HomeController from './HomeController'
import BookingController from './BookingController'
import DashboardController from './DashboardController'
import ServiceController from './ServiceController'
import TestimonialController from './TestimonialController'
import MenuController from './MenuController'
import SettingController from './SettingController'
import HomepageSectionController from './HomepageSectionController'
import FooterColumnController from './FooterColumnController'
import HeroSlideController from './HeroSlideController'
import Settings from './Settings'
const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
BookingController: Object.assign(BookingController, BookingController),
DashboardController: Object.assign(DashboardController, DashboardController),
ServiceController: Object.assign(ServiceController, ServiceController),
TestimonialController: Object.assign(TestimonialController, TestimonialController),
MenuController: Object.assign(MenuController, MenuController),
SettingController: Object.assign(SettingController, SettingController),
HomepageSectionController: Object.assign(HomepageSectionController, HomepageSectionController),
FooterColumnController: Object.assign(FooterColumnController, FooterColumnController),
HeroSlideController: Object.assign(HeroSlideController, HeroSlideController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers