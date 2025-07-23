<?php

return [
    'columns' => [
        'id' => [
            'type' => 'number',
            'label' => 'ID',
            'sortable' => true
        ],
        'user_id' => [
            'type' => 'relation',
            'label' => 'Customer',
            'relation' => 'user',
            'sortable' => true
        ],
        'order_number' => [
            'type' => 'string',
            'label' => 'Order Number',
            'sortable' => true,
            'searchable' => true
        ],
        'status' => [
            'type' => 'select',
            'label' => 'Status',
            'options' => ['pending', 'processing', 'completed', 'cancelled'],
            'sortable' => true,
            'filterable' => true
        ],
        'sub_total' => [
            'type' => 'currency',
            'label' => 'Subtotal',
            'sortable' => true
        ],
        'discount_amount' => [
            'type' => 'currency',
            'label' => 'Discount',
            'sortable' => true
        ],
        'tax_amount' => [
            'type' => 'currency',
            'label' => 'Tax',
            'sortable' => true
        ],
        'shipping_amount' => [
            'type' => 'currency',
            'label' => 'Shipping',
            'sortable' => true
        ],
        'total' => [
            'type' => 'currency',
            'label' => 'Total',
            'sortable' => true
        ],
        'payment_method' => [
            'type' => 'string',
            'label' => 'Payment Method',
            'sortable' => true,
            'filterable' => true
        ],
        'created_at' => [
            'type' => 'datetime',
            'label' => 'Order Date',
            'sortable' => true
        ],
    ],
    'default_sort' => [
        'column' => 'created_at',
        'direction' => 'desc'
    ],
    'per_page' => 25,
    'actions' => [
        'view',
        'edit',
        'delete'
    ]
];