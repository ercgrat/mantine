import React, { useState, forwardRef, useCallback } from 'react';
import { DefaultProps, ClassNames, useMantineDefaultProps } from '@mantine/styles';
import { Anchor } from '../Anchor';
import { Box } from '../Box';
import useStyles from './Spoiler.styles';

export type SpoilerStylesNames = ClassNames<typeof useStyles>;

export interface SpoilerProps
  extends DefaultProps<SpoilerStylesNames>,
    React.ComponentPropsWithoutRef<'div'> {
  /** Max height of visible content, when this point is reached spoiler appears */
  maxHeight: number;

  /** Label for close spoiler action */
  hideLabel: React.ReactNode;

  /** Label for open spoiler action */
  showLabel: React.ReactNode;

  /** Get ref of spoiler toggle button */
  controlRef?: React.ForwardedRef<HTMLButtonElement>;

  /** Initial spoiler state, true to wrap content in spoiler, false to show content without spoiler, opened state will be updated on mount */
  initialState?: boolean;

  /** Spoiler reveal transition duration in ms, 0 or null to turn off animation */
  transitionDuration?: number;
}

const defaultProps: Partial<SpoilerProps> = {
  maxHeight: 100,
  transitionDuration: 200,
  initialState: false,
};

export const Spoiler = forwardRef<HTMLDivElement, SpoilerProps>((props: SpoilerProps, ref) => {
  const {
    className,
    children,
    maxHeight,
    hideLabel,
    showLabel,
    transitionDuration,
    controlRef,
    initialState,
    classNames,
    styles,
    ...others
  } = useMantineDefaultProps('Spoiler', defaultProps, props);

  const { classes, cx } = useStyles(
    { transitionDuration },
    { classNames, styles, name: 'Spoiler' }
  );

  const [show, setShowState] = useState(initialState);
  const [spoiler, setSpoilerState] = useState(initialState);

  const [contentElement, setContentElement] = useState<HTMLElement | null>(null);
  const handleContentRendered = useCallback((content: HTMLDivElement | null) => {
    setContentElement(content);
    if (content) {
      setSpoilerState(maxHeight < content.clientHeight);
    }
  }, []);

  const spoilerMoreContent = show ? hideLabel : showLabel;

  return (
    <Box className={cx(classes.root, className)} ref={ref} {...others}>
      <div
        className={classes.content}
        style={{
          maxHeight: !show ? maxHeight : contentElement?.clientHeight ?? 0,
        }}
      >
        <div ref={handleContentRendered}>{children}</div>
      </div>

      {spoiler && (
        <Anchor
          component="button"
          ref={controlRef}
          onClick={() => setShowState((opened) => !opened)}
          className={classes.control}
        >
          {spoilerMoreContent}
        </Anchor>
      )}
    </Box>
  );
});

Spoiler.displayName = '@mantine/core/Spoiler';
