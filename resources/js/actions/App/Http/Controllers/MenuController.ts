import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MenuController::index
 * @see app/Http/Controllers/MenuController.php:14
 * @route '/dashboard/menus'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/menus',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MenuController::index
 * @see app/Http/Controllers/MenuController.php:14
 * @route '/dashboard/menus'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::index
 * @see app/Http/Controllers/MenuController.php:14
 * @route '/dashboard/menus'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MenuController::index
 * @see app/Http/Controllers/MenuController.php:14
 * @route '/dashboard/menus'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MenuController::index
 * @see app/Http/Controllers/MenuController.php:14
 * @route '/dashboard/menus'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MenuController::index
 * @see app/Http/Controllers/MenuController.php:14
 * @route '/dashboard/menus'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MenuController::index
 * @see app/Http/Controllers/MenuController.php:14
 * @route '/dashboard/menus'
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
* @see \App\Http\Controllers\MenuController::store
 * @see app/Http/Controllers/MenuController.php:21
 * @route '/dashboard/menus'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/menus',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MenuController::store
 * @see app/Http/Controllers/MenuController.php:21
 * @route '/dashboard/menus'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::store
 * @see app/Http/Controllers/MenuController.php:21
 * @route '/dashboard/menus'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MenuController::store
 * @see app/Http/Controllers/MenuController.php:21
 * @route '/dashboard/menus'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MenuController::store
 * @see app/Http/Controllers/MenuController.php:21
 * @route '/dashboard/menus'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\MenuController::reorder
 * @see app/Http/Controllers/MenuController.php:62
 * @route '/dashboard/menus/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/dashboard/menus/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MenuController::reorder
 * @see app/Http/Controllers/MenuController.php:62
 * @route '/dashboard/menus/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::reorder
 * @see app/Http/Controllers/MenuController.php:62
 * @route '/dashboard/menus/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MenuController::reorder
 * @see app/Http/Controllers/MenuController.php:62
 * @route '/dashboard/menus/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MenuController::reorder
 * @see app/Http/Controllers/MenuController.php:62
 * @route '/dashboard/menus/reorder'
 */
        reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(options),
            method: 'post',
        })
    
    reorder.form = reorderForm
/**
* @see \App\Http\Controllers\MenuController::update
 * @see app/Http/Controllers/MenuController.php:35
 * @route '/dashboard/menus/{menu}'
 */
export const update = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/menus/{menu}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MenuController::update
 * @see app/Http/Controllers/MenuController.php:35
 * @route '/dashboard/menus/{menu}'
 */
update.url = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menu: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { menu: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    menu: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        menu: typeof args.menu === 'object'
                ? args.menu.id
                : args.menu,
                }

    return update.definition.url
            .replace('{menu}', parsedArgs.menu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::update
 * @see app/Http/Controllers/MenuController.php:35
 * @route '/dashboard/menus/{menu}'
 */
update.put = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MenuController::update
 * @see app/Http/Controllers/MenuController.php:35
 * @route '/dashboard/menus/{menu}'
 */
    const updateForm = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MenuController::update
 * @see app/Http/Controllers/MenuController.php:35
 * @route '/dashboard/menus/{menu}'
 */
        updateForm.put = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\MenuController::destroy
 * @see app/Http/Controllers/MenuController.php:52
 * @route '/dashboard/menus/{menu}'
 */
export const destroy = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/menus/{menu}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MenuController::destroy
 * @see app/Http/Controllers/MenuController.php:52
 * @route '/dashboard/menus/{menu}'
 */
destroy.url = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menu: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { menu: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    menu: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        menu: typeof args.menu === 'object'
                ? args.menu.id
                : args.menu,
                }

    return destroy.definition.url
            .replace('{menu}', parsedArgs.menu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::destroy
 * @see app/Http/Controllers/MenuController.php:52
 * @route '/dashboard/menus/{menu}'
 */
destroy.delete = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MenuController::destroy
 * @see app/Http/Controllers/MenuController.php:52
 * @route '/dashboard/menus/{menu}'
 */
    const destroyForm = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MenuController::destroy
 * @see app/Http/Controllers/MenuController.php:52
 * @route '/dashboard/menus/{menu}'
 */
        destroyForm.delete = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const MenuController = { index, store, reorder, update, destroy }

export default MenuController