import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:13
 * @route '/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:13
 * @route '/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:13
 * @route '/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:13
 * @route '/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:13
 * @route '/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:13
 * @route '/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:13
 * @route '/dashboard'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
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
const DashboardController = { index, uploadImage }

export default DashboardController