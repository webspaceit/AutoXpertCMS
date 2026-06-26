import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import bookings from './bookings'
import services from './services'
import testimonials from './testimonials'
import menus from './menus'
import settings from './settings'
import sections from './sections'
import footerColumns from './footer-columns'
import heroSlides from './hero-slides'
/**
* @see \App\Http\Controllers\DashboardController::uploadImage
 * @see app/Http/Controllers/DashboardController.php:31
 * @route '/dashboard/upload-image'
 */
export const uploadImage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadImage.url(options),
    method: 'post',
})

uploadImage.definition = {
    methods: ["post"],
    url: '/dashboard/upload-image',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DashboardController::uploadImage
 * @see app/Http/Controllers/DashboardController.php:31
 * @route '/dashboard/upload-image'
 */
uploadImage.url = (options?: RouteQueryOptions) => {
    return uploadImage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::uploadImage
 * @see app/Http/Controllers/DashboardController.php:31
 * @route '/dashboard/upload-image'
 */
uploadImage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadImage.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DashboardController::uploadImage
 * @see app/Http/Controllers/DashboardController.php:31
 * @route '/dashboard/upload-image'
 */
    const uploadImageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadImage.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DashboardController::uploadImage
 * @see app/Http/Controllers/DashboardController.php:31
 * @route '/dashboard/upload-image'
 */
        uploadImageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadImage.url(options),
            method: 'post',
        })
    
    uploadImage.form = uploadImageForm
const admin = {
    bookings: Object.assign(bookings, bookings),
services: Object.assign(services, services),
testimonials: Object.assign(testimonials, testimonials),
menus: Object.assign(menus, menus),
settings: Object.assign(settings, settings),
uploadImage: Object.assign(uploadImage, uploadImage),
sections: Object.assign(sections, sections),
footerColumns: Object.assign(footerColumns, footerColumns),
heroSlides: Object.assign(heroSlides, heroSlides),
}

export default admin