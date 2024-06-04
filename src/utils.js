export async function getData(url) {
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


  export const timeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);
  
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 },
    ];
  
    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
      }
    }
  
    return 'just now';
  };


  export const truncate = (str)=>{
    if(str.length<120)
      {return str;}
    return str.slice(0,120) + "..."
  }