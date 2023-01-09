import { DocumentNode, gql } from "@apollo/client";
import { type LaunchesPastType } from "./launchesPast";

/**
 * Converts raw query data to a list of objects that may be used to easily
 * display data.
 * @param data The raw query input data that will be parsed.
 * @returns A list of `LaunchesPastType` objects.
 */
export const searchDataToLaunchType = (data: any): LaunchesPastType[] => {
  // Get the `launchesPast` field from the query data
  const launchesPast: any[] = data.launches;
  // Map over the data, convert it to the proper type, and return it
  return launchesPast.map<LaunchesPastType>((launch) => ({
    id: launch.id,
    details: launch.details ? launch.details : undefined,
    launchDate: new Date(launch.launch_date_utc),
    missionName: launch.mission_name,
    launchSite: {
      siteNameLong: launch.launch_site.site_name_long,
      siteId: launch.launch_site.site_id,
    },
    links: {
      articleLink: launch.links.article_link
        ? launch.links.article_link
        : undefined,
      videoLink: launch.links.video_link ? launch.links.video_link : undefined,
    },
    rocket: {
      rocketName: launch.rocket.rocket_name,
      rocket: {
        description: launch.rocket.rocket.description,
      },
      secondStage: {
        payloads: launch.rocket.second_stage.payloads.map((payload: any) => ({
          payloadType: payload.payload_type,
        })),
      },
    },
    ships: launch.ships.map((ship: any) => ({
      name: ship?.name ?? "",
      homePort: ship?.home_port ?? "",
      image: ship?.image ?? "",
      id: ship?.id ?? "",
    })),
  }));
};

/**
 * Retrieves the proper query string for the past SpaceX launches matching a
 * given mission name.
 * @param name The name of the mission to search for.
 * @returns The query string that may be used to properly query the backend
 * for the needed data.
 */
export const getLaunchesByNameQuery = (name: string): DocumentNode => {
  return gql`
    {
      launches(find: {mission_name: "${name}"}) {
        mission_name
        launch_site {
          site_name_long
          site_id
        }
        links {
          article_link
          video_link
        }
        rocket {
          rocket_name
          second_stage {
            payloads {
              payload_type
            }
          }
          rocket {
            description
          }
        }
        ships {
          name
          home_port
          image
          id
        }
        launch_date_utc
        id
        details
      }
    }
  `;
};
