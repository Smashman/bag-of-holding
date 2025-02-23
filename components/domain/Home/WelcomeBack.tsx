import { Box, BoxProps, Divider, SimpleGrid } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import sort from "fast-sort";
import RememberedSheet from "./RememberedSheet";
import { useColorModeValue } from "@chakra-ui/color-mode";
import useRememberedSheets from "../../../utils/useRememberedSheets";
import { H3 } from "../../ui/Typography";

/**
 * The 'welcome back' section in the homepage
 *
 * @param {object} props The props
 * @returns {React.ReactElement} Component stuff
 */
const WelcomeBack: React.FC<BoxProps> = (props) => {
	const rememberedSheets = useRememberedSheets();

	/**
	 * Calculate how many columns to use in the SheetCard
	 * grid
	 *
	 * @param {number} columns The maximum number of columns
	 * to use
	 * @returns {number} Either the provided columns number,
	 * or the length of the 'rememberedSheets' length, whichever
	 * is lower
	 */
	const getRememberedSheetCardColumns = (columns: number) =>
		Math.min(rememberedSheets.length, columns);

	const rememberedSheetCardColumns = useBreakpointValue([
		getRememberedSheetCardColumns(1),
		getRememberedSheetCardColumns(2),
		getRememberedSheetCardColumns(4),
	]);

	const dividerColor = useColorModeValue("gray.500", "gray.200");

	return (
		!!rememberedSheets.length && (
			<Box {...props}>
				<Divider backgroundColor={dividerColor} borderColor={dividerColor} />
				<H3 marginY="break" textAlign="center">
					Welcome Back
				</H3>
				<SimpleGrid columns={rememberedSheetCardColumns} spacing="break">
					{sort(rememberedSheets)
						.desc("lastAccessedAt")
						.slice(0, 4)
						.map((props, index) => (
							<RememberedSheet {...props} key={index} />
						))}
				</SimpleGrid>
			</Box>
		)
	);
};

export default WelcomeBack;
