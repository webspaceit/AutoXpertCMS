import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:14
 * @route '/dashboard/testimonials'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/testimonials',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:14
 * @route '/dashboard/testimonials'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:14
 * @route '/dashboard/testimonials'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:14
 * @route '/dashboard/testimonials'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:14
 * @route '/dashboard/testimonials'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:14
 * @route '/dashboard/testimonials'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:14
 * @route '/dashboard/testimonials'
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
* @see \App\Http\Controllers\TestimonialController::store
 * @see app/Http/Controllers/TestimonialController.php:24
 * @route '/dashboard/testimonials'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/testimonials',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TestimonialController::store
 * @see app/Http/Controllers/TestimonialController.php:24
 * @route '/dashboard/testimonials'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::store
 * @see app/Http/Controllers/TestimonialController.php:24
 * @route '/dashboard/testimonials'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TestimonialController::store
 * @see app/Http/Controllers/TestimonialController.php:24
 * @route '/dashboard/testimonials'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TestimonialController::store
 * @see app/Http/Controllers/TestimonialController.php:24
 * @route '/dashboard/testimonials'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TestimonialController::reorder
 * @see app/Http/Controllers/TestimonialController.php:70
 * @route '/dashboard/testimonials/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/dashboard/testimonials/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TestimonialController::reorder
 * @see app/Http/Controllers/TestimonialController.php:70
 * @route '/dashboard/testimonials/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::reorder
 * @see app/Http/Controllers/TestimonialController.php:70
 * @route '/dashboard/testimonials/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TestimonialController::reorder
 * @see app/Http/Controllers/TestimonialController.php:70
 * @route '/dashboard/testimonials/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TestimonialController::reorder
 * @see app/Http/Controllers/TestimonialController.php:70
 * @route '/dashboard/testimonials/reorder'
 */
        reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(options),
            method: 'post',
        })
    
    reorder.form = reorderForm
/**
* @see \App\Http\Controllers\TestimonialController::update
 * @see app/Http/Controllers/TestimonialController.php:42
 * @route '/dashboard/testimonials/{testimonial}'
 */
export const update = (args: { testimonial: number | { id: number } } | [testimonial: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/testimonials/{testimonial}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\TestimonialController::update
 * @see app/Http/Controllers/TestimonialController.php:42
 * @route '/dashboard/testimonials/{testimonial}'
 */
update.url = (args: { testimonial: number | { id: number } } | [testimonial: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { testimonial: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { testimonial: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    testimonial: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        testimonial: typeof args.testimonial === 'object'
                ? args.testimonial.id
                : args.testimonial,
                }

    return update.definition.url
            .replace('{testimonial}', parsedArgs.testimonial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::update
 * @see app/Http/Controllers/TestimonialController.php:42
 * @route '/dashboard/testimonials/{testimonial}'
 */
update.put = (args: { testimonial: number | { id: number } } | [testimonial: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\TestimonialController::update
 * @see app/Http/Controllers/TestimonialController.php:42
 * @route '/dashboard/testimonials/{testimonial}'
 */
    const updateForm = (args: { testimonial: number | { id: number } } | [testimonial: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TestimonialController::update
 * @see app/Http/Controllers/TestimonialController.php:42
 * @route '/dashboard/testimonials/{testimonial}'
 */
        updateForm.put = (args: { testimonial: number | { id: number } } | [testimonial: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TestimonialController::destroy
 * @see app/Http/Controllers/TestimonialController.php:60
 * @route '/dashboard/testimonials/{testimonial}'
 */
export const destroy = (args: { testimonial: number | { id: number } } | [testimonial: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/testimonials/{testimonial}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TestimonialController::destroy
 * @see app/Http/Controllers/TestimonialController.php:60
 * @route '/dashboard/testimonials/{testimonial}'
 */
destroy.url = (args: { testimonial: number | { id: number } } | [testimonial: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { testimonial: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { testimonial: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    testimonial: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        testimonial: typeof args.testimonial === 'object'
                ? args.testimonial.id
                : args.testimonial,
                }

    return destroy.definition.url
            .replace('{testimonial}', parsedArgs.testimonial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::destroy
 * @see app/Http/Controllers/TestimonialController.php:60
 * @route '/dashboard/testimonials/{testimonial}'
 */
destroy.delete = (args: { testimonial: number | { id: number } } | [testimonial: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TestimonialController::destroy
 * @see app/Http/Controllers/TestimonialController.php:60
 * @route '/dashboard/testimonials/{testimonial}'
 */
    const destroyForm = (args: { testimonial: number | { id: number } } | [testimonial: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TestimonialController::destroy
 * @see app/Http/Controllers/TestimonialController.php:60
 * @route '/dashboard/testimonials/{testimonial}'
 */
        destroyForm.delete = (args: { testimonial: number | { id: number } } | [testimonial: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const TestimonialController = { index, store, reorder, update, destroy }

export default TestimonialController