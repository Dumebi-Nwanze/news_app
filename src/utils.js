export async function getData(url) { // get dats from url and return the results
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        console.log("Could not fetch data");
        return;
      }
      const data = await response.json();
      //console.log(data);
      return data;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  export const timeAgo = (date) => { // format the timestamp from ISO to time ago
  
    const now = new Date();
    const past = new Date(date);
    // get the difference in seconds between the current time and  date
    const diffInSeconds = Math.floor((now - past) / 1000);
  
    // array of time intervals with their seconds values
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 },
    ];
  
    // For each interval
    for (const interval of intervals) {
      // get how many times the interval fits into the difference in seconds
      const count = Math.floor(diffInSeconds / interval.seconds);
      // If the interval fits at least once
      if (count >= 1) {
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
      }
    }
  
    // if the date is in the future or something went wrong
    return 'just now';
  };
  


  export const truncate = (str, amount)=>{ // trucate data to make sure it fits in card
    if(str.length<(amount??120))
      {return str;}
    return str.slice(0,(amount??120)) + "..."
  }

  export function formatContent(content) { //remove the =[1233chars] that comes with the article content
    if (!content) return "";
    const truncated = content.split("... ")[0];
    return truncated ? truncated + "..." : content;
  }
  