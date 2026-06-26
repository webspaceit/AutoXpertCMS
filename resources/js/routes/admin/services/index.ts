import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ServiceController::index
 * @see app/Http/Controllers/ServiceController.php:14
 * @route '/dashboard/services'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/services',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceController::index
 * @see app/Http/Controllers/ServiceController.php:14
 * @route '/dashboard/services'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceController::index
 * @see app/Http/Controllers/ServiceController.php:14
 * @route '/dashboard/services'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceController::index
 * @see app/Http/Controllers/ServiceController.php:14
 * @route '/dashboard/services'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceController::index
 * @see app/Http/Controllers/ServiceController.php:14
 * @route '/dashboard/services'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceController::index
 * @see app/Http/Controllers/ServiceController.php:14
 * @route '/dashboard/services'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceController::index
 * @see app/Http/Controllers/ServiceController.php:14
 * @route '/dashboard/services'
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
* @see \App\Http\Controllers\ServiceController::store
 * @see app/Http/Controllers/ServiceController.php:24
 * @route '/dashboard/services'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/services',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceController::store
 * @see app/Http/Controllers/ServiceController.php:24
 * @route '/dashboard/services'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceController::store
 * @see app/Http/Controllers/ServiceController.php:24
 * @route '/dashboard/services'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceController::store
 * @see app/Http/Controllers/ServiceController.php:24
 * @route '/dashboard/services'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceController::store
 * @see app/Http/Controllers/ServiceController.php:24
 * @route '/dashboard/services'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ServiceController::reorder
 * @see app/Http/Controllers/ServiceController.php:74
 * @route '/dashboard/services/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/dashboard/services/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceController::reorder
 * @see app/Http/Controllers/ServiceController.php:74
 * @route '/dashboard/services/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceController::reorder
 * @see app/Http/Controllers/ServiceController.php:74
 * @route '/dashboard/services/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceController::reorder
 * @see app/Http/Controllers/ServiceController.php:74
 * @route '/dashboard/services/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceController::reorder
 * @see app/Http/Controllers/ServiceController.php:74
 * @route '/dashboard/services/reorder'
 */
        reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(options),
            method: 'post',
        })
    
    reorder.form = reorderForm
/**
* @see \App\Http\Controllers\ServiceController::update
 * @see app/Http/Controllers/ServiceController.php:44
 * @route '/dashboard/services/{service}'
 */
export const update = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/services/{service}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ServiceController::update
 * @see app/Http/Controllers/ServiceController.php:44
 * @route '/dashboard/services/{service}'
 */
update.url = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { service: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    service: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        service: typeof args.service === 'object'
                ? args.service.id
                : args.service,
                }

    return update.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceController::update
 * @see app/Http/Controllers/ServiceController.php:44
 * @route '/dashboard/services/{service}'
 */
update.put = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ServiceController::update
 * @see app/Http/Controllers/ServiceController.php:44
 * @route '/dashboard/services/{service}'
 */
    const updateForm = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceController::update
 * @see app/Http/Controllers/ServiceController.php:44
 * @route '/dashboard/services/{service}'
 */
        updateForm.put = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ServiceController::destroy
 * @see app/Http/Controllers/ServiceController.php:64
 * @route '/dashboard/services/{service}'
 */
export const destroy = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/services/{service}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ServiceController::destroy
 * @see app/Http/Controllers/ServiceController.php:64
 * @route '/dashboard/services/{service}'
 */
destroy.url = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { service: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    service: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        service: typeof args.service === 'object'
                ? args.service.id
                : args.service,
                }

    return destroy.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceController::destroy
 * @see app/Http/Controllers/ServiceController.php:64
 * @route '/dashboard/services/{service}'
 */
destroy.delete = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ServiceController::destroy
 * @see app/Http/Controllers/ServiceController.php:64
 * @route '/dashboard/services/{service}'
 */
    const destroyForm = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceController::destroy
 * @see app/Http/Controllers/ServiceController.php:64
 * @route '/dashboard/services/{service}'
 */
        destroyForm.delete = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const services = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
reorder: Object.assign(reorder, reorder),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default services