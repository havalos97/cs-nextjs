import { Children, FC, ReactNode, ReactElement } from "react";

type Children = { children: ReactNode; };

type ShowProps = FC<Children> & {
  When: FC<WhenProps>;
  Else: FC<ElseProps>;
};

type WhenProps = {
  condition: boolean;
} & Children;

type ElseProps = Children;

export const Show: ShowProps = (props) => {
  let when: ReactNode | null = null;
  let otherwise: ReactNode | null = null;

  Children.forEach(props.children, (child) => {
    if (child && typeof child === 'object' && 'props' in child) {
      const { condition } = child.props;
      if (condition === undefined) {
        otherwise = child;
      } else if (!when && condition === true) {
        when = child;
      }
    } else {
      otherwise = child;
    }
  });

  return when || otherwise || null;
};

Show.When = ({ condition, children }) =>
  condition
    ? children as ReactElement
    : null
  
Show.When.displayName = 'Show.When';

Show.Else = ({ children }) =>
  children
    ? children as ReactElement
    : null

Show.Else.displayName = 'Show.Else';
