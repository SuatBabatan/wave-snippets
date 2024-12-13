/* eslint-disable no-restricted-globals */
import React, { FC } from 'react'

import { analytics } from '../config/firebase'
import { useSnippetState } from '../context'
import { Button, useDisclosure } from './core'
import { ExportModal } from './ExportModal'

type ExportMenuProps = {
  snippetID?: string
  isLoading?: boolean
  isDisabled?: boolean
}

export const ExportMenu: FC<ExportMenuProps> = ({ snippetID }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { steps, tags, defaultLanguage, saveOrCreateSnippet } = useSnippetState()

  const handleExport = async () => {
    analytics.logEvent('snippet_export_modal_opened', {
      language: defaultLanguage,
      numberOfSteps: steps.length,
      snippetTags: tags,
    })

    // Save the snippet first if it doesn't exist
    const id = snippetID || await saveOrCreateSnippet({ force: true })
    onOpen()
  }

  return (
    <>
      <Button
        isDisabled={steps.length <= 1}
        onClick={handleExport}
      >
        Export
      </Button>
      <ExportModal 
        isOpen={isOpen} 
        onClose={onClose} 
        snippetID={snippetID || ''} 
      />
    </>
  )
}
