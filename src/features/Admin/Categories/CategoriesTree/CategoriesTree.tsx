import { Typography } from '@mui/material'
import { RichTreeView } from '@mui/x-tree-view/RichTreeView'
import Box from '@mui/material/Box'
import * as React from 'react'
import { SyntheticEvent } from 'react'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

interface TreeViewProps<R> {
    onItemSelectionToggle?: (
        event: SyntheticEvent<Element, Event>,
        itemId: string,
        isSelected: boolean,
    ) => void
    onItemFocus?: (
        event: SyntheticEvent<Element, Event> | null,
        itemId: string,
    ) => void
    getItemId?: (item: R) => string
    getItemLabel?: (item: R) => string
    treeItems: R[]
}
export const TreeView = <R extends {}>(props: TreeViewProps<R>) => {
    const {
        onItemSelectionToggle,
        onItemFocus,
        getItemId,
        getItemLabel,
        treeItems,
    } = props
    const { t } = getTranslation()

    return (
        <Box
            sx={{
                maxWidth: 400,
            }}
        >
            <Typography variant="h6">
                {t('adminCategories.currentCategories')}
            </Typography>
            <RichTreeView
                items={treeItems}
                onItemSelectionToggle={onItemSelectionToggle}
                multiSelect
                getItemId={getItemId}
                getItemLabel={getItemLabel}
                onItemFocus={onItemFocus}
            />
        </Box>
    )
}
