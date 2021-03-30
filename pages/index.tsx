import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { appDisplayTitle, appDomain } from "../constants/meta";
import WelcomeBack from "../components/domain/Home/WelcomeBack";
import BagOfHoldingIcon from "../components/icons/BagOfHoldingIcon";
import { use100vh } from "react-div-100vh";
import Meta from "../components/templates/Meta";
import ColorModeSwitch from "../components/ui/ColorModeSwitch";
import GitLink from "../components/ui/GitLink";
import { InformationIcon, MailOutlineIcon } from "chakra-ui-ionicons";
import IconLink from "../components/ui/IconLink";
import getSheetLink from "../utils/getSheetLink";

/**
 * Home component
 *
 * @returns {React.ReactElement} The home page
 */
const Home: React.FC = () => {
	const [newSheetIsLoading, setNewSheetIsLoading] = useState<boolean>(false);
	const router = useRouter();
	/**
	 * Create a new sheet, then redirect the user to that sheet
	 */
	const getNewSheet = () => {
		setNewSheetIsLoading(true);
		fetch("api/sheet", { method: "POST" })
			.then((res) => res.json())
			.then((data) => {
				router.push(getSheetLink(data as string));
			})
			.catch(() => setNewSheetIsLoading(false));
	};
	//FIXME: The get started button does not work when live (most of the time)

	const screenHeight = use100vh();

	return (
		<>
			<Meta url={appDomain} />
			<main>
				<Flex direction="column" minHeight={screenHeight}>
					<Flex justify="space-between" padding={2} width="full">
						<ColorModeSwitch />
						<HStack justify="flex-end">
							<IconLink
								href="/info"
								aria-label="link to info page"
								icon={<InformationIcon boxSize="icon" />}
								variant="ghost"
							/>
							<IconLink
								href="/contact"
								aria-label="link to contact page"
								icon={<MailOutlineIcon boxSize="icon" />}
								variant="ghost"
							/>
							<GitLink />
						</HStack>
					</Flex>
					<Center width="full" flexGrow={1} padding="break">
						<Box>
							<VStack spacing="break" marginBottom="break">
								<Center>
									<BagOfHoldingIcon fill="white" boxSize={[40, 44, 52]} />
								</Center>
								{/* Main Title */}
								<Heading textAlign="center" textStyle="h1" as="h1" width="full">
									{appDisplayTitle}
								</Heading>
								<Heading textAlign="center" textStyle="h2" as="h2" width="full">
									Track your party{"'"}s inventory, no matter what you play
								</Heading>
								<Center>
									<VStack spacing="break">
										<Button
											onClick={getNewSheet}
											isLoading={newSheetIsLoading}
											colorScheme="primary"
										>
											Get Started
										</Button>
										<Button variant="ghost" size="xs">
											What is this?
										</Button>
									</VStack>
								</Center>
							</VStack>
							<WelcomeBack />
						</Box>
					</Center>
				</Flex>
			</main>
		</>
	);
};

export default Home;
