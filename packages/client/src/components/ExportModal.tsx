import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useToast,
} from '@chakra-ui/core'
import { useFormik } from 'formik'
import { useAuthState } from '../context'

interface Props {
  isOpen: boolean
  onClose: () => void
  snippetID: string
}

export const ExportModal: React.FC<Props> = ({ isOpen, onClose, snippetID }) => {
  const toast = useToast()
  const { user } = useAuthState()

  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
  } = useFormik({
    initialValues: {
      highQualityMode: false,
    },
    onSubmit: async ({ highQualityMode }, { setSubmitting }) => {
      try {
        const response = await fetch(
          `/api/queue/media-export?id=${snippetID}&quality=${
            highQualityMode ? 'high' : 'low'
          }`,
          {
            method: 'POST',
          },
        )

        if (!response.ok) {
          throw new Error('Failed to export')
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `snippet-${snippetID}.gif`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)

        toast({
          title: 'Export started!',
          description: 'Your GIF will be downloaded shortly.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })

        onClose()
      } catch (err) {
        console.error('Export error:', err)
        toast({
          title: 'Export failed.',
          description: 'Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Export Snippet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel htmlFor="highQualityMode">
                High Quality Mode
              </FormLabel>
              <Switch
                id="highQualityMode"
                name="highQualityMode"
                isChecked={values.highQualityMode}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variantColor="blue"
              mr={3}
              isLoading={isSubmitting}
              type="submit"
            >
              Export
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
