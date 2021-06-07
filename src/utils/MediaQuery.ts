import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

/**
 * example: const useScreenMedium = useScreenMediaQuery('md');
 * breakpoints: xl, lg, md, sm, xs
 * @param breakpoints
 */

type Props = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export function useScreenMediaQuery(breakpoints: Props): boolean {
    const theme = useTheme();
    const screenBreakpoints: string = breakpoints;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return useMediaQuery(theme.breakpoints.only(screenBreakpoints));
}
