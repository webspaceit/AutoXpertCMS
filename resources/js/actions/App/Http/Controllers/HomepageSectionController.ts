import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HomepageSectionController::index
 * @see app/Http/Controllers/HomepageSectionController.php:13
 * @route '/dashboard/sections'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/sections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomepageSectionController::index
 * @see app/Http/Controllers/HomepageSectionController.php:13
 * @route '/dashboard/sections'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomepageSectionController::index
 * @see app/Http/Controllers/HomepageSectionController.php:13
 * @route '/dashboard/sections'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomepageSectionController::index
 * @see app/Http/Controllers/HomepageSectionController.php:13
 * @route '/dashboard/sections'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomepageSectionController::index
 * @see app/Http/Controllers/HomepageSectionController.php:13
 * @route '/dashboard/sections'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomepageSectionController::index
 * @see app/Http/Controllers/HomepageSectionController.php:13
 * @route '/dashboard/sections'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomepageSectionController::index
 * @see app/Http/Controllers/HomepageSectionController.php:13
 * @route '/dashboard/sections'
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
* @see \App\Http\Controllers\HomepageSectionController::store
 * @see app/Http/Controllers/HomepageSectionController.php:55
 * @route '/dashboard/sections'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/sections',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HomepageSectionController::store
 * @see app/Http/Controllers/HomepageSectionController.php:55
 * @route '/dashboard/sections'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomepageSectionController::store
 * @see app/Http/Controllers/HomepageSectionController.php:55
 * @route '/dashboard/sections'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HomepageSectionController::store
 * @see app/Http/Controllers/HomepageSectionController.php:55
 * @route '/dashboard/sections'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HomepageSectionController::store
 * @see app/Http/Controllers/HomepageSectionController.php:55
 * @route '/dashboard/sections'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\HomepageSectionController::reorder
 * @see app/Http/Controllers/HomepageSectionController.php:116
 * @route '/dashboard/sections/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/dashboard/sections/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HomepageSectionController::reorder
 * @see app/Http/Controllers/HomepageSectionController.php:116
 * @route '/dashboard/sections/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomepageSectionController::reorder
 * @see app/Http/Controllers/HomepageSectionController.php:116
 * @route '/dashboard/sections/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HomepageSectionController::reorder
 * @see app/Http/Controllers/HomepageSectionController.php:116
 * @route '/dashboard/sections/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HomepageSectionController::reorder
 * @see app/Http/Controllers/HomepageSectionController.php:116
 * @route '/dashboard/sections/reorder'
 */
        reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(options),
            method: 'post',
        })
    
    reorder.form = reorderForm
/**
* @see \App\Http\Controllers\HomepageSectionController::update
 * @see app/Http/Controllers/HomepageSectionController.php:85
 * @route '/dashboard/sections/{section}'
 */
export const update = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/sections/{section}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\HomepageSectionController::update
 * @see app/Http/Controllers/HomepageSectionController.php:85
 * @route '/dashboard/sections/{section}'
 */
update.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return update.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomepageSectionController::update
 * @see app/Http/Controllers/HomepageSectionController.php:85
 * @route '/dashboard/sections/{section}'
 */
update.put = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\HomepageSectionController::update
 * @see app/Http/Controllers/HomepageSectionController.php:85
 * @route '/dashboard/sections/{section}'
 */
    const updateForm = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HomepageSectionController::update
 * @see app/Http/Controllers/HomepageSectionController.php:85
 * @route '/dashboard/sections/{section}'
 */
        updateForm.put = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\HomepageSectionController::destroy
 * @see app/Http/Controllers/HomepageSectionController.php:107
 * @route '/dashboard/sections/{section}'
 */
export const destroy = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/sections/{section}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\HomepageSectionController::destroy
 * @see app/Http/Controllers/HomepageSectionController.php:107
 * @route '/dashboard/sections/{section}'
 */
destroy.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return destroy.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomepageSectionController::destroy
 * @see app/Http/Controllers/HomepageSectionController.php:107
 * @route '/dashboard/sections/{section}'
 */
destroy.delete = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\HomepageSectionController::destroy
 * @see app/Http/Controllers/HomepageSectionController.php:107
 * @route '/dashboard/sections/{section}'
 */
    const destroyForm = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HomepageSectionController::destroy
 * @see app/Http/Controllers/HomepageSectionController.php:107
 * @route '/dashboard/sections/{section}'
 */
        destroyForm.delete = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const HomepageSectionController = { index, store, reorder, update, destroy }

export default HomepageSectionController