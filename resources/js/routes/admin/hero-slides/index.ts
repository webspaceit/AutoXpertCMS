import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/dashboard/hero-slides'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/hero-slides',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/dashboard/hero-slides'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/dashboard/hero-slides'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/dashboard/hero-slides'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/dashboard/hero-slides'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/dashboard/hero-slides'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/dashboard/hero-slides'
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
* @see \App\Http\Controllers\HeroSlideController::store
 * @see app/Http/Controllers/HeroSlideController.php:19
 * @route '/dashboard/hero-slides'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/hero-slides',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HeroSlideController::store
 * @see app/Http/Controllers/HeroSlideController.php:19
 * @route '/dashboard/hero-slides'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroSlideController::store
 * @see app/Http/Controllers/HeroSlideController.php:19
 * @route '/dashboard/hero-slides'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HeroSlideController::store
 * @see app/Http/Controllers/HeroSlideController.php:19
 * @route '/dashboard/hero-slides'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HeroSlideController::store
 * @see app/Http/Controllers/HeroSlideController.php:19
 * @route '/dashboard/hero-slides'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\HeroSlideController::reorder
 * @see app/Http/Controllers/HeroSlideController.php:62
 * @route '/dashboard/hero-slides/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/dashboard/hero-slides/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HeroSlideController::reorder
 * @see app/Http/Controllers/HeroSlideController.php:62
 * @route '/dashboard/hero-slides/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroSlideController::reorder
 * @see app/Http/Controllers/HeroSlideController.php:62
 * @route '/dashboard/hero-slides/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HeroSlideController::reorder
 * @see app/Http/Controllers/HeroSlideController.php:62
 * @route '/dashboard/hero-slides/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HeroSlideController::reorder
 * @see app/Http/Controllers/HeroSlideController.php:62
 * @route '/dashboard/hero-slides/reorder'
 */
        reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(options),
            method: 'post',
        })
    
    reorder.form = reorderForm
/**
* @see \App\Http\Controllers\HeroSlideController::update
 * @see app/Http/Controllers/HeroSlideController.php:37
 * @route '/dashboard/hero-slides/{heroSlide}'
 */
export const update = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/hero-slides/{heroSlide}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\HeroSlideController::update
 * @see app/Http/Controllers/HeroSlideController.php:37
 * @route '/dashboard/hero-slides/{heroSlide}'
 */
update.url = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { heroSlide: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { heroSlide: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    heroSlide: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        heroSlide: typeof args.heroSlide === 'object'
                ? args.heroSlide.id
                : args.heroSlide,
                }

    return update.definition.url
            .replace('{heroSlide}', parsedArgs.heroSlide.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroSlideController::update
 * @see app/Http/Controllers/HeroSlideController.php:37
 * @route '/dashboard/hero-slides/{heroSlide}'
 */
update.put = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\HeroSlideController::update
 * @see app/Http/Controllers/HeroSlideController.php:37
 * @route '/dashboard/hero-slides/{heroSlide}'
 */
    const updateForm = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HeroSlideController::update
 * @see app/Http/Controllers/HeroSlideController.php:37
 * @route '/dashboard/hero-slides/{heroSlide}'
 */
        updateForm.put = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\HeroSlideController::destroy
 * @see app/Http/Controllers/HeroSlideController.php:55
 * @route '/dashboard/hero-slides/{heroSlide}'
 */
export const destroy = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/hero-slides/{heroSlide}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\HeroSlideController::destroy
 * @see app/Http/Controllers/HeroSlideController.php:55
 * @route '/dashboard/hero-slides/{heroSlide}'
 */
destroy.url = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { heroSlide: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { heroSlide: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    heroSlide: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        heroSlide: typeof args.heroSlide === 'object'
                ? args.heroSlide.id
                : args.heroSlide,
                }

    return destroy.definition.url
            .replace('{heroSlide}', parsedArgs.heroSlide.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroSlideController::destroy
 * @see app/Http/Controllers/HeroSlideController.php:55
 * @route '/dashboard/hero-slides/{heroSlide}'
 */
destroy.delete = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\HeroSlideController::destroy
 * @see app/Http/Controllers/HeroSlideController.php:55
 * @route '/dashboard/hero-slides/{heroSlide}'
 */
    const destroyForm = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HeroSlideController::destroy
 * @see app/Http/Controllers/HeroSlideController.php:55
 * @route '/dashboard/hero-slides/{heroSlide}'
 */
        destroyForm.delete = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const heroSlides = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
reorder: Object.assign(reorder, reorder),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default heroSlides