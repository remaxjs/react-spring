import animated from '../../animated/createAnimatedComponent'
import * as Globals from '../../animated/Globals'
import { update } from '../../animated/FrameLoop'
import { interpolate } from '../../interpolate'
import { config } from '../../shared/constants'
import {
  AnimatedComponent,
  CreateAnimatedComponent,
} from '../../types/animated'
import { useChain } from '../../useChain'
import { useSpring } from '../../useSpring'
import { useSprings } from '../../useSprings'
import { useTrail } from '../../useTrail'
import { useTransition } from '../../useTransition'
import { remaxMerge as merge } from '../../shared/helpers'
import './globals'

type AnimatedWithDOMElements = CreateAnimatedComponent &
  { [Tag in any]: AnimatedComponent<any> }

const apply = merge(animated as AnimatedWithDOMElements)

export {
  apply,
  config,
  update,
  animated,
  animated as a,
  interpolate,
  Globals,
  useSpring,
  useTrail,
  useTransition,
  useChain,
  useSprings,
}
