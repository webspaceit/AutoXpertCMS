import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\FooterColumnController::index
 * @see app/Http/Controllers/FooterColumnController.php:11
 * @route '/dashboard/footer-columns'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/footer-columns',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FooterColumnController::index
 * @see app/Http/Controllers/FooterColumnController.php:11
 * @route '/dashboard/footer-columns'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FooterColumnController::index
 * @see app/Http/Controllers/FooterColumnController.php:11
 * @route '/dashboard/footer-columns'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FooterColumnController::index
 * @see app/Http/Controllers/FooterColumnController.php:11
 * @route '/dashboard/footer-columns'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FooterColumnController::index
 * @see app/Http/Controllers/FooterColumnController.php:11
 * @route '/dashboard/footer-columns'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FooterColumnController::index
 * @see app/Http/Controllers/FooterColumnController.php:11
 * @route '/dashboard/footer-columns'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FooterColumnController::index
 * @see app/Http/Controllers/FooterColumnController.php:11
 * @route '/dashboard/footer-columns'
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
* @see \App\Http\Controllers\FooterColumnController::store
 * @see app/Http/Controllers/FooterColumnController.php:19
 * @route '/dashboard/footer-columns'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/footer-columns',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FooterColumnController::store
 * @see app/Http/Controllers/FooterColumnController.php:19
 * @route '/dashboard/footer-columns'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FooterColumnController::store
 * @see app/Http/Controllers/FooterColumnController.php:19
 * @route '/dashboard/footer-columns'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FooterColumnController::store
 * @see app/Http/Controllers/FooterColumnController.php:19
 * @route '/dashboard/footer-columns'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FooterColumnController::store
 * @see app/Http/Controllers/FooterColumnController.php:19
 * @route '/dashboard/footer-columns'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\FooterColumnController::reorder
 * @see app/Http/Controllers/FooterColumnController.php:58
 * @route '/dashboard/footer-columns/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/dashboard/footer-columns/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FooterColumnController::reorder
 * @see app/Http/Controllers/FooterColumnController.php:58
 * @route '/dashboard/footer-columns/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FooterColumnController::reorder
 * @see app/Http/Controllers/FooterColumnController.php:58
 * @route '/dashboard/footer-columns/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FooterColumnController::reorder
 * @see app/Http/Controllers/FooterColumnController.php:58
 * @route '/dashboard/footer-columns/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FooterColumnController::reorder
 * @see app/Http/Controllers/FooterColumnController.php:58
 * @route '/dashboard/footer-columns/reorder'
 */
        reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(options),
            method: 'post',
        })
    
    reorder.form = reorderForm
/**
* @see \App\Http\Controllers\FooterColumnController::update
 * @see app/Http/Controllers/FooterColumnController.php:35
 * @route '/dashboard/footer-columns/{footerColumn}'
 */
export const update = (args: { footerColumn: number | { id: number } } | [footerColumn: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/footer-columns/{footerColumn}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\FooterColumnController::update
 * @see app/Http/Controllers/FooterColumnController.php:35
 * @route '/dashboard/footer-columns/{footerColumn}'
 */
update.url = (args: { footerColumn: number | { id: number } } | [footerColumn: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { footerColumn: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { footerColumn: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    footerColumn: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        footerColumn: typeof args.footerColumn === 'object'
                ? args.footerColumn.id
                : args.footerColumn,
                }

    return update.definition.url
            .replace('{footerColumn}', parsedArgs.footerColumn.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FooterColumnController::update
 * @see app/Http/Controllers/FooterColumnController.php:35
 * @route '/dashboard/footer-columns/{footerColumn}'
 */
update.put = (args: { footerColumn: number | { id: number } } | [footerColumn: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\FooterColumnController::update
 * @see app/Http/Controllers/FooterColumnController.php:35
 * @route '/dashboard/footer-columns/{footerColumn}'
 */
    const updateForm = (args: { footerColumn: number | { id: number } } | [footerColumn: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FooterColumnController::update
 * @see app/Http/Controllers/FooterColumnController.php:35
 * @route '/dashboard/footer-columns/{footerColumn}'
 */
        updateForm.put = (args: { footerColumn: number | { id: number } } | [footerColumn: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\FooterColumnController::destroy
 * @see app/Http/Controllers/FooterColumnController.php:51
 * @route '/dashboard/footer-columns/{footerColumn}'
 */
export const destroy = (args: { footerColumn: number | { id: number } } | [footerColumn: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/footer-columns/{footerColumn}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FooterColumnController::destroy
 * @see app/Http/Controllers/FooterColumnController.php:51
 * @route '/dashboard/footer-columns/{footerColumn}'
 */
destroy.url = (args: { footerColumn: number | { id: number } } | [footerColumn: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { footerColumn: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { footerColumn: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    footerColumn: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        footerColumn: typeof args.footerColumn === 'object'
                ? args.footerColumn.id
                : args.footerColumn,
                }

    return destroy.definition.url
            .replace('{footerColumn}', parsedArgs.footerColumn.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FooterColumnController::destroy
 * @see app/Http/Controllers/FooterColumnController.php:51
 * @route '/dashboard/footer-columns/{footerColumn}'
 */
destroy.delete = (args: { footerColumn: number | { id: number } } | [footerColumn: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FooterColumnController::destroy
 * @see app/Http/Controllers/FooterColumnController.php:51
 * @route '/dashboard/footer-columns/{footerColumn}'
 */
    const destroyForm = (args: { footerColumn: number | { id: number } } | [footerColumn: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FooterColumnController::destroy
 * @see app/Http/Controllers/FooterColumnController.php:51
 * @route '/dashboard/footer-columns/{footerColumn}'
 */
        destroyForm.delete = (args: { footerColumn: number | { id: number } } | [footerColumn: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const footerColumns = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
reorder: Object.assign(reorder, reorder),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default footerColumns