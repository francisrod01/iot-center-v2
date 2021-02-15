// wrapper for fixing issue with antPath - source: https://github.com/rubenspgcavalcante/react-leaflet-ant-path/issues/10#issuecomment-724303657

// eslint-disable-next-line
// @ts-nocheck
import {
  createElementHook,
  createPathHook,
  createContainerComponent,
} from '@react-leaflet/core'
import {antPath} from 'leaflet-ant-path'

function createAntPath(props, context) {
  const instance = antPath(props.positions, props.options)
  return {instance, context: {...context, overlayContainer: instance}}
}

function updateAntPath(instance, props, prevProps) {
  if (
    props.positions !== prevProps.positions ||
    props.options !== prevProps.options
  ) {
    instance.setLatLngs(props.positions)
  }
}

const useAntPathElement = createElementHook(createAntPath, updateAntPath)
const useAntPath = createPathHook(useAntPathElement)
const AntPath = createContainerComponent(useAntPath)

export default AntPath
