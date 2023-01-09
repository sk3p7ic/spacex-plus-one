import { DocumentNode, gql } from "@apollo/client";

/** Defines the data type used for storing query responses related to past
 * launches.
 */
export type LaunchesPastType = {
  id: number;
  launchDate: Date;
  missionName: string;
  launchSite: {
    siteNameLong: string;
    siteId: string;
  };
  links: {
    articleLink?: string;
    videoLink?: string;
  };
  rocket: {
    rocketName: string;
    rocket: {
      description: string;
    };
    secondStage: {
      payloads: {
        payloadType: string;
      }[];
    };
  };
  ships: {
    name: string;
    homePort: string;
    image: string;
  }[];
};

/**
 * Converts raw query data to a list of objects that may be used to easily
 * display data.
 * @param data The raw query input data that will be parsed.
 * @returns A list of `LaunchesPastType` objects.
 */
export const dataToLaunchType = (data: any): LaunchesPastType[] => {
  // Get the `launchesPast` field from the query data
  const launchesPast: any[] = data.launchesPast;
  // Map over the data, convert it to the proper type, and return it
  return launchesPast.map<LaunchesPastType>((launch) => ({
    id: launch.id,
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
      name: ship.name,
      homePort: ship.home_port,
      image: ship.image,
    })),
  }));
};

/**
 *  Retrieves the proper query string for the past SpaceX launches.
 * @param limit The number of results to return for this query.
 * @param start The offset (start) number to count the limit from.
 * @returns The query string that may be used to properly query the backend
 * for the needed data.
 */
export const getLaunchesLastQuery = (
  limit: number,
  start?: number
): DocumentNode => {
  start = start || 0; // Set start to 0 if it is not defined
  return gql`
    {
      launchesPast(limit: ${limit}, offset: ${start}) {
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
        }
        launch_date_utc
        id
      }
    }
  `;
};
